on:
  workflow_call:
    inputs:
      github-environment:
        required: true
        type: string
      stage:
        required: true
        type: string
      github-author:
        required: false
        type: string
    secrets:
      aws-role-arn:
        required: true

permissions:
  id-token: write
  contents: read
  packages: read

env:
  NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

jobs:
  deploy-s3-resources:
    name: Deploy @shieldpay/s3-resources
    runs-on: ubuntu-latest
    environment: ${{ inputs.github-environment }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3.5.2

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: ${{ secrets.aws-role-arn }}
          aws-region: eu-west-1

      - name: Install
        run: yarn workspaces focus @shieldpay/s3-resources

      - name: Deploy S3 resources
        working-directory: backend/resources/s3
        run: STAGE=${{ inputs.stage }} GITHUB_AUTHOR=${{ inputs.github-author }} SLS_DEBUG=* yarn deploy

  deploy-rds-resources:
    name: Deploy rds
    needs: deploy-s3-resources
    runs-on: ubuntu-latest
    environment: ${{ inputs.github-environment }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3.5.2

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: ${{ secrets.aws-role-arn }}
          aws-region: eu-west-1

      - name: Install
        run: yarn workspaces focus rds

      - name: Compile
        working-directory: backend/development/rds
        run: yarn compile

      - name: Deploy RDS resources
        working-directory: backend/development/rds
        run: STAGE=${{ inputs.stage }} GITHUB_AUTHOR=${{ inputs.github-author }} SLS_DEBUG=* yarn deploy

  deploy-sns-resources:
    name: Deploy @shieldpay/sns-resources
    needs: deploy-s3-resources
    runs-on: ubuntu-latest
    environment: ${{ inputs.github-environment }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3.5.2

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: ${{ secrets.aws-role-arn }}
          aws-region: eu-west-1

      - name: Install
        run: yarn workspaces focus @shieldpay/sns-resources

      - name: Install Chamber
        shell: bash
        run: |
          ARCH=$(uname -m) && \
          PACKAGECLOUD="https://packagecloud.io/segment/chamber/packages/ubuntu/focal" && \
          if [ "$ARCH" == "arm64" ] || [ "$ARCH" == "aarch64" ]; then \
          wget --content-disposition $PACKAGECLOUD/chamber_2.10.2_arm64.deb/download.deb?distro_version_id=210 && \
          sudo apt-get install ./chamber_2.10.2_arm64.deb; \
          else \
          wget --content-disposition $PACKAGECLOUD/chamber_2.10.2_amd64.deb/download.deb?distro_version_id=210 && \
          sudo apt-get install ./chamber_2.10.2_amd64.deb; \
          fi

      - name: Load env variables from Parameter Store
        shell: bash
        run: (chamber env backend/resources/sns) >> backend/resources/sns/.env

      - name: Deploy SNS resources
        working-directory: backend/resources/sns
        shell: bash
        run: source .env && STAGE=${{ inputs.stage }} GITHUB_AUTHOR=${{ inputs.github-author }} SLS_DEBUG=* yarn deploy

  deploy-sftp-resources:
    name: Deploy @shieldpay/sftp-resources
    needs: deploy-s3-resources
    runs-on: ubuntu-latest
    container: node:14.17.6
    environment: ${{ inputs.github-environment }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3.5.2

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: ${{ secrets.aws-role-arn }}
          aws-region: eu-west-1

      - name: Install
        run: yarn workspaces focus @shieldpay/sftp-resources

      - name: Install Chamber
        run: |
          curl -s https://packagecloud.io/install/repositories/segment/chamber/script.deb.sh | bash
          apt-get install -y chamber

      - name: Load env variables from Parameter Store
        shell: bash
        run: (chamber env backend/resources/sftp) >> backend/resources/sftp/.env

      - name: Compile
        working-directory: backend/resources/sftp
        run: yarn compile

      - name: Deploy SFTP resources
        working-directory: backend/resources/sftp
        shell: bash
        run: source .env && STAGE=${{ inputs.stage }} GITHUB_AUTHOR=${{ inputs.github-author }} SLS_DEBUG=* yarn deploy