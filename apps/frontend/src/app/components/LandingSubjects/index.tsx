"use client";

import { useRouter } from 'next/navigation'

import styles from './LandingSubjects.module.scss'
 
const LandingSubject = () => {
    const router = useRouter();

    return ( 
		<section className={styles.landingSubjects} data-cy="landingOurSubjectsSection">

			<div className={styles.container}>

				<div className="section-title">
					<h2>Our Subjects</h2>
					<div></div>
				</div>

				<div className={styles.subjectList} data-cy="landingOurSubjectsSectionItems">

					<div onClick={() => { router.push(  { pathname: '/list-subjects', query:{ category: 'Academic' } } )}}>
						<div>
							<img src='/images/landing/academic.png' alt="Academic Subjects Image" />
						</div>
						<h5>Academic</h5>
					</div>

					<div onClick={() => { router.push(  { pathname: '/list-subjects', query:{ category: 'IT' } } )}}>
						<div>
							<img src='/images/landing/it.png' alt="IT Subjects Image" />
						</div>
						<h5>IT</h5>
					</div>
					
					<div onClick={() => { router.push(  { pathname: '/list-subjects', query:{ category: 'Lifestyle' } } )}}>
						<div>
							<img src='/images/landing/lifestyle.png' alt="Lifestyle Subjects Image" />
						</div>
						<h5>Lifestyle</h5>
					</div>

					<div onClick={() => { router.push(  { pathname: '/list-subjects', query:{ category: 'Professional' } } )}}>
						<div>
							<img src='/images/landing/professional.png' alt="sub" />
						</div>
						<h5>Professional</h5>
					</div>
				</div>

				<div className={styles.subjectBtn}>
					<button type="button" onClick={ () => {router.push('/list-subjects'); } }>View all Subjects</button>
				</div>
			</div>

		</section>
    );
}
 
export default LandingSubject;