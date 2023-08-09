// import Image from 'next/image';

import styles from './LandingHowItWorks.module.scss';
 
const LandingHowItWorks = () => {
    return ( 
		<section className={styles.landingHow} data-cy="landingHowItWorksSection">

            <div className={styles.container}>
                <div>
                    <div className="section-title">
                        <h2>How It Works</h2>
                        <div></div>
                    </div>
                </div>

                <article className={styles.landingHowStep}>
                    <div className={styles.howWorkImg}>
                        <img src='/images/landing/register.png' alt='Register image' />
                    </div>
                    <div className={styles.howWorkContent}>
                        <h3>1. Register as a Parent or Student</h3>
                        <ul>
                            <li key="1.1">Registration is free and easy</li>
                        </ul>
                    </div>
                </article>

                <article className={styles.landingHowStepRev}>
                    <div className={styles.howWorkImg}>
                        <img src='/images/landing/search-tutor.png' alt='Search for a tutor image' />
                        
                    </div>
                    <div className={styles.howWorkContent}>
                        <h3>2. Search Our Tutors</h3>
                        <ul>
                            <li key="2.1">Search via subjects and level</li>
                            <li key="2.2">Select Tutors whose availability matches your requirements</li>
                            <li key="2.3">Check tutor reviews</li>
                            <li key="2.4">Short list a few tutors</li>
                        </ul>
                    </div>
                </article>

                <article className={styles.landingHowStep}>
                    <div className={styles.howWorkImg}>
                        <img src='/images/landing/register.png' alt='Contact tutor image' />
                    </div>

                    <div className={styles.howWorkContent}>
                        <h3>3. Contact Tutors</h3>
                        <ul>
                        <li key="3.1">Message as many tutors as you require</li>
                        <li key="3.2">Ask as many questions as you like</li>
                        <li key="3.3">Select your preferred tutor</li>
                        </ul>
                    </div>
                </article>

                <article className={styles.landingHowStepRev}>
                    <div className={styles.howWorkImg}>
                        <img src='/images/landing/book-tutor.png' alt='Book tutor image' />
                    </div>

                    <div className={styles.howWorkContent}>
                        <h3>4. Book Tutor</h3>
                        <ul>
                            <li key="4.1">Book the lessons via TutorSeekers or via messaging the tutor</li>
                            <li key="4.2">Await booking confirmation</li>
                        </ul>
                    </div>
                </article>

                <article className={styles.landingHowStep}>
                    <div className={styles.howWorkImg}>
                        <img src='/images/landing/each-lesson.png' alt='Document each lesson image'/>
                    </div>

                    <div className={styles.howWorkContent}>
                        <h3>5. Each Lesson</h3>
                        <ul>
                            <li key="5.1">Tutors can document an overview of the content covered</li>
                            <li key="5.2">Tutors can record homework</li>
                            <li key="5.3">Tutors can review and record completed homework in the next lesson</li>
                            <li key="5.4">Lesson content, homework and marking can be viewed at any time by the student or parent</li>
                            <li key="5.5">Students, parents can make requests for the next lesson</li>
                        </ul>
                    </div>
                </article>

                <article className={styles.landingHowStepRev}>
                    <div className={styles.howWorkImg}>
                        <img src='/images/landing/for-you.png' alt='We are there for you image' />
                    </div>

                    <div className={styles.howWorkContent}>
                        <h3>6. We are there for you</h3>
                        <ul>
                            <li key="6.1">Combine tutoring with our other services</li>
                            <li key="6.2">Knowledge Center</li>
                            <li key="6.3">Study Buddy</li>
                            <li key="6.4">Questions and Answers</li>
                        </ul>
                    </div>
                </article>
            </div>
		</section>
    );
}
 
export default LandingHowItWorks;