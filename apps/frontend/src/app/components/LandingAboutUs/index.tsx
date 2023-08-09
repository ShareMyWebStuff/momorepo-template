import Image from 'next/image'
import styles from './LandingAboutUs.module.scss';

const LandingAboutUs = () => {
    return ( 
        <section className={styles.landingAboutUs} data-cy="landingAboutUsSection">

            <div className="section-title">
                <h2>About Us</h2>
                <div></div>
            </div>

            <article  className={styles.landingAboutUsArticle}>

                {/* <div>
                <Image src='/images/landing/about.png' alt='About Us Image' layout='responsive' width={659} height={639} quality={75}/>
                </div> */}
                <img src='/images/landing/about.png' alt='About Us Image' />
                <p>Whether you are hoping to expand your own knowledge or unlock your child’s full potential, we have what you need.</p>
                <p>We can put you in touch with a wide variety of tutors and our helpful search and filter facilities will help you quickly locate a tutor that meets your specific criteria. Sound good? We think so. And the best part is, it’s completely free of charge!</p>
                <p>Unlike most of our competitors, we won’t charge you for contacting tutors or using our site. </p>


                {/* <div>
                    <Image src='/images/landing/about.png' alt='About Us Image' layout='responsive' width={659} height={639} quality={75}/>
                </div>
                <div>
                    <p>Whether you are hoping to expand your own knowledge or unlock your child’s full potential, we have what you need.</p>
                    <p>We can put you in touch with a wide variety of tutors and our helpful search and filter facilities will help you quickly locate a tutor that meets your specific criteria. Sound good? We think so. And the best part is, it’s completely free of charge!</p>
                    <p>Unlike most of our competitors, we won’t charge you for contacting tutors or using our site. </p>
                </div> */}

            </article>
            
        </section>
    );
}
 
export default LandingAboutUs;