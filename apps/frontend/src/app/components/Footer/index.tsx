"use client";
import Link from 'next/link'
import Image from 'next/image'

import { useAppSelector } from 'hooks/store'
import { RootState } from 'store/store'

import styles from './Footer.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faTwitterSquare  } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {

    const statusVals = useAppSelector( (state: RootState) => state.status)

    // const loggedIn = authVals.isAuthenticated
    const loggedIn = statusVals.isAuthenticated
    const disabled = statusVals.loading || statusVals.saving
    const enabled=(disabled ? '' : styles.enabled)

    const year = new Date().getFullYear();

    // (disabled ? <Image src='/images/general/logo.png' alt='Tutor seekers logo' layout='intrinsic'  width={360} height={67} quality={75}/> :
    // <Link href={(loggedIn? '/activity-center':'/')} > 
    //     <Image src='/images/general/logo.png' alt='Tutor seekers logo' layout='intrinsic'  width={360} height={67} quality={75}/>
    // </Link>
    // )

    return ( 

        <footer className={styles.footer} data-cy="footer">
            <div className={( disabled ? '' : ` ${styles.navbarEnabled}` )} >

                <div className={styles.topFooter}>
                    <div className={styles.mission} data-cy="mission">
                        <div className={styles.footerLogo}>
                        {
                            (disabled ? <Image src='/images/general/logo.png' alt='Tutor seekers logo' width={360} height={67} quality={75}/> :
                            <Link href={(loggedIn? '/activity-center':'/')} > 
                                <Image src='/images/general/logo.png' alt='Tutor seekers logo' width={360} height={67} quality={75}/>
                            </Link>
                            )
                        }
                            {/* <Link href='/' > 
                                
                                    <Image src='/images/general/logo.png' alt='Tutor seekers logo' layout='intrinsic'  width={360} height={67} quality={75}/>
                                
                            </Link> */}

                        </div>
                        <p>Empowering students to achieve more</p>

                        <div className={styles.socialIcons}> 
                            <FontAwesomeIcon className={styles.socialFB} icon={faFacebookSquare}/>
                            <FontAwesomeIcon className={styles.socialTW} icon={faTwitterSquare} />
                            <FontAwesomeIcon className={styles.socialEM} icon={faEnvelope}/>
                        </div>
                    </div>

                    <div className={styles.groupLinks}>
                        <h5>Company</h5>
                        <ul>
                            <li>
                                <Link href={{pathname:'/legal', query: {legal: 'terms'}}}>
                                    Terms
                                </Link>
                            </li>
                            <li>
                                <Link href={{pathname:'/legal', query: {legal: 'privacy'}}}>
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link href={{pathname:'/legal', query: {legal: 'cookies'}}}>
                                    Cookie
                                </Link>
                            </li>
                            <li>
                                <Link href={{pathname:'/legal', query: {legal: 'safeguarding'}}}>
                                    Safeguarding
                                </Link>
                            </li>
                            <li>
                                <Link href='/'>
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>


                    <div className={styles.groupLinks}>
                        <h5>Services</h5>
                        <ul>
                            <li><Link href="/tutor-search">Tutor Search</Link></li>
                            <li><Link href='/'>Search Student Ads</Link></li>
                            <li><Link href='/'>Question &amp; Answers</Link></li>
                            <li><Link href='/'>Knowledge Centre</Link></li>
                            <li><Link href='/'>Courses</Link></li>
                            <li><Link href='/'>Study Buddies</Link></li>
                        </ul>
                    </div>

                    <div className={styles.groupLinks}>
                        <h5>Popular Subjects</h5>
                        <ul>
                            <li><Link href={{pathname:'/tutor-search', query: {subject: 'Maths'}}}>Maths</Link></li>
                            <li><Link href={{pathname:'/tutor-search', query: {subject: 'English'}}}>English</Link></li>
                            <li><Link href={{pathname:'/tutor-search', query: {subject: 'Biology'}}}>Biology</Link></li>
                            <li><Link href={{pathname:'/tutor-search', query: {subject: 'Chemistry'}}}>Chemistry</Link></li>
                            <li><Link href={{pathname:'/tutor-search', query: {subject: 'Physics'}}}>Physics</Link></li>
                            <li><Link href={{pathname:'/tutor-search', query: {subject: 'French'}}}>French</Link></li>
                        </ul>
                    </div>

                </div>

                <div className={styles.bottomFooter} data-cy="copyright">
                    <p>Copyright © 2015 - {year} Cameron and Guy Limited</p>
                </div>
            </div>


        </footer>
    )
}

export default Footer