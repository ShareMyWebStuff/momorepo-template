"use client";
import { useState } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'

import styles from './LandingOtherServices.module.scss'

const LandingOtherServices = () => {

	const [curItem, setCurItem ] = useState(0);
	const [nextItem, setNextItem ] = useState(1);

	const sliderData = [
		{
			img: '/images/landing/course-icon.png',
            alt: 'Courses image',
			header: "Courses",
			para: "Looking for courses online or in your local area? Search our listings to see if we have what your looking for. Tutors and companies are encouraged to advertise free of charge, so whether it’s learning to throw pottery or a crash course in algebra over a school holiday, we have it covered.",
			btnText: "View Courses"
		}, {
			img: '/images/landing/knowledge-icon.png',
            alt: 'Knowledge center image',
			header: "Knowledge Center",
			para: "We welcome articles from tutors and students alike. Want to get something published or looking for help on a specific subject? Click on the link to have a look at the articles in a knowledge center. Each article is rated and feedback provided by other users and tutors.",
			btnText: "View Knowledge Center"

		}, {
			img: '/images/landing/study-buddies.jpg',
            alt: 'Study buddy image',
			header: "Study Buddies",
			para: "Learning can be less daunting when you learn together. We can put you in touch with other people learning the same subject at the same level as you. Read our security tips to ensure you use this facility in a safe way.",
			btnText: "View Study Buddies"
		}, {
			img: '/images/landing/question-and-answer.jpg',
            alt: 'Questions and answers image',
			header: "Questions and Answers",
			para: "Need an answer to a challenging question? You can post specific answers online and other tutors and students will tell you what they think! Need an answer from a subject matter expert quickly? You can pay to post questions to specific tutors taking part.",
			btnText: "View Q & A"
		}
	];

    // Handler for previous slide
	const handlePrevBtn = () => {
		setCurItem ( curItem  === 0 ? sliderData.length -1 :  curItem-1);
		setNextItem( nextItem  === 0 ? sliderData.length -1: nextItem-1);
	}

    // Handler for the next slide
	const handleNextBtn = () => {
		setCurItem (sliderData.length -1 === curItem ? 0 :  curItem+1);
		setNextItem(sliderData.length -1 === nextItem ? 0 :  nextItem+1);
	}

    return ( 
        <section className={styles.landingOther} data-cy="landingOtherServicesSection">

            <header>
                <div className="section-title">
                    <h2>Other Services</h2>
                    <div></div>
                </div>
                <p>We care passionately about making learning easy and ensuring you have access to all your educational needs in one place.</p>
                <p>Looking for reading material on a specific subject? Maybe you’ve got a challenging subject you can’t quickly crack or you’re thinking of taking a course just for fun. </p>
            </header>

            <div className={styles.landingOtherSlider}>

                <div className={styles.sliderPrev}>
                    <button title="Previous Service" onClick={handlePrevBtn} data-cy="prevBtn"><FontAwesomeIcon icon={faChevronCircleLeft} /></button>
                </div>

                <div className={styles.sliderItem} data-cy="landingOtherServicesArticles">

                    <article>
                        {/* <div><Image src={sliderData[curItem].img} alt={sliderData[curItem].alt} layout='responsive' width={536} height={295.13} quality={75}/></div> */}
                        <div><Image src={sliderData[curItem].img} alt={sliderData[curItem].alt} width={536} height={295.13} quality={75}/></div>
                        <h4>{sliderData[curItem].header}</h4>
                        <p>{sliderData[curItem].para}</p>
                        <button type="button" className={styles.button}>{sliderData[curItem].btnText}</button>
                    </article>

                    <article className={styles.sliderItem2}>
                        {/* <div><Image src={sliderData[nextItem].img} alt={sliderData[nextItem].alt} layout='responsive' width={536} height={295.13} quality={75}/></div> */}
                        <div><Image src={sliderData[nextItem].img} alt={sliderData[nextItem].alt} width={536} height={295.13} quality={75}/></div>
                        <h4>{sliderData[nextItem].header}</h4>
                        <p>{sliderData[nextItem].para}</p>
                        <div>
                        <button type="button" className={styles.button}>{sliderData[nextItem].btnText}</button>
                        </div>
                    </article>

                </div>

                <div className={styles.sliderNext}>
                    <button title="Next Service" onClick={handleNextBtn} data-cy="nextBtn"><FontAwesomeIcon icon={faChevronCircleRight} /></button>
                </div>

            </div>
        </section>
    );
}
 
export default LandingOtherServices;