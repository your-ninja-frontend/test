import './style.css';
import 'swiper/css';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

document.addEventListener('DOMContentLoaded', () => {
	let mql = window.matchMedia('(max-width: 767px)');
	let swiper;

	const initSwiper = () => {
		swiper = new Swiper('.swiper', {
			modules: [Pagination],
			slidesPerView: 1,
			spaceBetween: 15,
			grabCursor: true,
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	};

	const checkBreakpoint = () => {
		if (mql.matches) {
			initSwiper();
		} else {
			if (swiper !== undefined) {
				swiper.destroy();
			}
		}
	};

	mql.addEventListener('change', checkBreakpoint);
	checkBreakpoint();

	const timer = document.getElementById('timer');

	const timerCount = 30 * 60 * 1000;
	let end = Date.now() + timerCount;

	const getTimeRemaining = (end) => {
		const time = end - Date.now();
		let hourse = Math.floor((time / (1000 * 60 * 60)) % 24);
		let minutes = Math.floor((time / (1000 * 60)) % 60);
		let seconds = Math.floor((time / 1000) % 60);

		hourse = ('0' + hourse).slice(-2);
		minutes = ('0' + minutes).slice(-2);
		seconds = ('0' + seconds).slice(-2);

		return {
			t: time,
			h: hourse,
			m: minutes,
			s: seconds,
		};
	};

	const initTimer = (el, end) => {
		function update() {
			let time = getTimeRemaining(end);
			el.innerHTML = `
		<span>${time.h}</span>
		:
		<span>${time.m}</span>
		:
		<span>${time.s}</span>
		`;

			if (time.t <= 0) {
				clearInterval(intervalId);
				end = Date.now() + timerCount;
				initTimer(el, end);
			}
		}
		update();
		let intervalId = setInterval(update, 1000);
	};

	initTimer(timer, end);

	gsap.registerPlugin(ScrollTrigger);

	gsap.to('.bg-parallax', {
		scrollTrigger: {
			trigger: '.bg-parallax',
			toggleActions: 'restart none reverse none',
			start: 'top 210px',
			end: '85% 730px',
		},
		y: 5,
		duration: 0.5,
	});
});
