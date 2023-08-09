"use client";

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

import { useAppSelector, useAppDispatch } from 'hooks/store'
import { RootState } from 'store/store'
// import { logout } from '@store/slices/authSlice'
import { setLoadingSpinner, resetStatus, logout } from '@store/slices/statusSlice'
import { resetRegister } from '@store/slices/registerSlice'

import styles from './Header.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faBars } from '@fortawesome/free-solid-svg-icons'
import sendMsg from '@utils/sendMsg'


interface IChildren {
    children: React.ReactNode
}

type T_menus = {
    mainMenu: boolean
    searchMenu: boolean
    servicesMenu: boolean
}

/**
 * 
 * Header
 * 
 * Displays the header / navbar which changes depending on the client being signed in or out and the type of account they hold
 * 
 * @returns 
 */
const Header = ( ) => {

    const router = useRouter();
    const pathname = usePathname();
    
    const dispatch = useAppDispatch()
    const statusVals = useAppSelector( (state: RootState) => state.status)
    const [menuChecked, setMenuChecked] = useState<T_menus>({mainMenu: false, searchMenu: false, servicesMenu: false})

    useEffect ( () => {
        setMenuChecked( {mainMenu: false, searchMenu: false, servicesMenu: false} )
    }, [pathname])

    const isAuthenticated = false;
    const loading = false; 
    const absolutePaths: string[] = ['/', '/register', '/login', '/user/password-reset', '/activity-center', '/user/resend-register-verification']
    // const darkPaths: string[] = ['/list-subjects', '/legal', '/become-a-tutor', '/404', '/user/verify-media', '/user/verify-media/[verificationCode]', '/user/verify-password-reset', '/user/verify-password-reset/[resetCode]' ];
    const darkPaths: string[] = ['/user/profile', '/user/profile/about', '/list-subjects', '/become-a-tutor', '/legal', '/404', '/user/verify-media', '/user/verify-media/[verificationCode]', '/user/verify-password-reset', '/user/verify-password-reset/[resetCode]' ];

    const lightPaths: string[] = ['/tutor-search']; // This path does not exist
    const narrowPaths: string[] = ['/list-subjects', '/tutor-search' ];

    let absClass=`${styles.navbar} ` + (absolutePaths.includes(pathname) ? styles.navAbsolute : '');
    let formatClass = '';
    formatClass += styles.navbarDark;
    // if (darkPaths.includes(router.pathname)) formatClass += styles.navbarDark;
    // if (lightPaths.includes(router.pathname)) formatClass += styles.navbarLight;
    if (narrowPaths.includes(pathname)) absClass += ' ' + styles.navbarNarrow;

    const runLogout = async () => {
        dispatch(setLoadingSpinner())
        await dispatch(logout(true))
        dispatch(resetStatus())

        router.push(  '/' ); 
    }


    const loggedIn = statusVals.isAuthenticated
    const disabled = statusVals.loading || statusVals.saving
    const enabled=(disabled ? '' : styles.enabled)

    const sendDetails = async () => {
        let res: any =  await sendMsg( 'POST', 'user/auth/check', {})

        console.log ('USER DETAILS')
        console.log (res)
    }

    // const sendProfile = async () => {
    //     let res: any =  await sendMsg( 'GET', 'user/profile', {})

    //     console.log ('USER PROFILE')
    //     console.log (res)
    // }

    // const sendAbout = async () => {
    //     let res: any =  await sendMsg( 'GET', 'user/about', {})

    //     console.log ('ABOUT DETAILS')
    //     console.log (res)
    // }

    // const sendLanguages = async () => {
    //     let res: any =  await sendMsg( 'GET', 'user/languages', {})

    //     console.log ('LANGUAGES')
    //     console.log (res)
    // }

    // const sendSubjects = async () => {
    //     let res: any =  await sendMsg( 'GET', 'user/subjects', {})

    //     console.log ('SUBJECTS')
    //     console.log (res)
    // }

    // const sendQualifications = async () => {
    //     let res: any =  await sendMsg( 'GET', 'user/qualifications', {})

    //     console.log ('QUALIFIATIONS')
    //     console.log (res)
    // }

    return (

        <header data-cy="header">
            <section className={formatClass} data-cy="navbar">
                <nav role="navigation" id="navbar" className={`${styles.container}`} data-cy="navigation">

                    <div className={absClass}>
                        <div className={`${styles.navbarLogo} ${enabled}` } data-cy="navbarLogo">
                            {
                                (disabled ? <Image src='images/general/logo.png' alt='Tutor seekers logo' width={360} height={67} quality={75}/> :
                                <Link href={(loggedIn? '/activity-center':'/')} > 
                                <a>
                                    <Image src='images/general/logo.png' alt='Tutor seekers logo' width={360} height={67} quality={75}/>
                                </a>
                                </Link>
                                )
                            }
                        </div>

                        <div className={styles.navbarToggler} data-cy="navbarToggler">
                            <label htmlFor="navbar-toggler__checkbox"><FontAwesomeIcon icon={faBars} size="lg"/></label>
                        </div>
                        <input checked={menuChecked.mainMenu} onChange={() => setMenuChecked ( (prev ) => { return {...prev, mainMenu: !menuChecked.mainMenu }} ) }
                            disabled={disabled} type="checkbox" id="navbar-toggler__checkbox" />

                        <div className={`${styles.navbarMenu}` + ( disabled ? '' : ` ${styles.navbarEnabled}` )} data-cy="navbarMenu">
                            <ul>

                                <li className={enabled}>
                                    <label className={styles.menuDropdown} htmlFor="navbar-dropdown_1">Search <FontAwesomeIcon icon={faAngleDown} /></label>
                                    <input checked={menuChecked.searchMenu} onChange={() => setMenuChecked ( (prev ) => { return {...prev, searchMenu: !menuChecked.searchMenu }} ) } disabled={disabled} type="checkbox" id="navbar-dropdown_1"/>
                                    <ul>
                                    
                                    {/* <li onClick={() => { sendProfile()} } className={styles.menuItem}><span>Get Profile</span></li>
                                    <li onClick={() => { sendDetails()} } className={styles.menuItem}><span>Get Details</span></li>
                                    <li onClick={() => { sendAbout()} } className={styles.menuItem}><span>Get About</span></li>
                                    <li onClick={() => { sendLanguages()} } className={styles.menuItem}><span>Get Languages</span></li>
                                    <li onClick={() => { sendSubjects()} } className={styles.menuItem}><span>Get Subjects</span></li>
                                    <li onClick={() => { sendQualifications()} } className={styles.menuItem}><span>Get Qualifications</span></li> */}
                                        <li onClick={() => { sendDetails()} } className={styles.menuItem}><span>Check Connection</span></li>
                                        <li onClick={() => { if (!disabled ) {router.push(  '/lessons/lesson-financials' )}}} className={styles.menuItem}><span>Financials</span></li>
                                        <li onClick={() => { if (!disabled ) {router.push(  '/tutor-search' )}}} className={styles.menuItem}><span>Tutors</span></li>
                                        <li className={styles.menuItem}><span>Tutoring Ads</span></li>
                                        <li onClick={() => { if (!disabled ){router.push(  '/courses' )}}} className={styles.menuItem}><span>Courses</span></li>

                                        <li onClick={() => { if (!disabled ){router.push(  '/knowledge' )}}} className={styles.menuItem}><span>Knowledge Centre</span></li>
                                        <li onClick={() => { if (!disabled ){router.push(  '/questions' )}}} className={styles.menuItem}><span>Q &amp; A</span></li>
                                        <li onClick={() => { if (!disabled ){router.push(  '/buddy' )}}} className={styles.menuItem}><span>Study Buddy</span></li>
                                    </ul>
                                </li>

                                {/* <li className={enabled}>
                                    <label  className={styles.menuDropdown} htmlFor="navbar-dropdown_2">Services <FontAwesomeIcon icon={faAngleDown} /></label>
                                    <input checked={menuChecked.servicesMenu} onChange={() => setMenuChecked ( (prev ) => { return {...prev, servicesMenu: !menuChecked.servicesMenu }} ) } disabled={disabled} type="checkbox" id="navbar-dropdown_2"/>
                                    <ul>
                                        <li className={styles.menuItem}><span>Courses</span></li>
                                        <li className={styles.menuItem}><span>Knowledge Centre</span></li>
                                        <li className={styles.menuItem}><span>Q &amp; A</span></li>
                                        <li className={styles.menuItem}><span>Study Buddy</span></li>
                                    </ul>
                                </li> */}

                                { !loggedIn && <li onClick={ () => {if (!disabled ){router.push(  '/become-a-tutor' )}}}><span className={styles.menuDropdown}>Become a tutor</span></li> }

                                <li>
                                    {loggedIn ? 
                                        <button disabled={disabled} className={'btn ${styles.logoutBtn}'+ (disabled ? ' btnDisabled': '')} onClick={ () => {runLogout(); } }>Logout</button>
                                        :
                                        <>
                                            <button disabled={disabled} className={'btn mr-2 ' + (disabled ? ' btnDisabled': 'btnOrange')} onClick={ () => {router.push(  '/login'); } }>Login</button>
                                            <button disabled={disabled} className={`btn ${styles.registerBtn}`+ (disabled ? ' btnDisabled': '')} 
                                            onClick={() => {dispatch(resetRegister());router.push(  '/register' )}}>Register</button>
                                        </>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </section>
        </header> 
    )
}
 
export default Header;