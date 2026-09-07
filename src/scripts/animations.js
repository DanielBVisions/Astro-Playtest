import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Wraps every word of a heading in <span class="word">word</span> so each
// word can move up + fade in independently, while leaving existing markup
// (accent color spans, <br>) untouched — text nodes are the only thing
// split. No overflow:hidden wrapper here: at this heading font's tight
// line-height (0.8), clipping each word's box cropped ascenders and
// descenders even at rest, not just mid-animation.
function wrapWords(root) {
	const walk = (node) => {
		Array.from(node.childNodes).forEach((child) => {
			if (child.nodeType === Node.TEXT_NODE) {
				const parts = child.textContent.split(/(\s+)/);
				const frag = document.createDocumentFragment();
				parts.forEach((part) => {
					if (part === '') return;
					if (/^\s+$/.test(part)) {
						frag.appendChild(document.createTextNode(part));
						return;
					}
					const word = document.createElement('span');
					word.className = 'word';
					word.textContent = part;
					frag.appendChild(word);
				});
				node.replaceChild(frag, child);
			} else if (child.nodeType === Node.ELEMENT_NODE) {
				walk(child);
			}
		});
	};
	walk(root);
}

function initHeadingReveals() {
	document.querySelectorAll('.section-heading').forEach((heading) => {
		wrapWords(heading);
		const words = heading.querySelectorAll('.word');
		if (!words.length) return;

		gsap.set(words, { y: 28, opacity: 0 });
		gsap.to(words, {
			y: 0,
			opacity: 1,
			duration: 0.7,
			ease: 'power3.out',
			stagger: 0.035,
			scrollTrigger: {
				trigger: heading,
				start: 'top 88%',
				once: true,
			},
		});
	});
}

function initCardReveals() {
	const groupSelectors = ['.pillars__grid', '.values__grid', '.team__grid'];

	document.querySelectorAll(groupSelectors.join(',')).forEach((group) => {
		const items = Array.from(group.children);
		if (!items.length) return;

		gsap.set(items, { y: 40, opacity: 0 });
		gsap.to(items, {
			y: 0,
			opacity: 1,
			duration: 0.6,
			ease: 'power2.out',
			stagger: 0.1,
			scrollTrigger: {
				trigger: group,
				start: 'top 85%',
				once: true,
			},
		});
	});
}

// "The shift" timeline: the centre line fills as the section scrolls
// through view (scrubbed, tied directly to scroll position). The first
// row starts highlighted (it's the current/active step by default).
// Scrolling down past a row does NOT dim it back out — once reached, it
// stays lit, like a step being checked off — but scrolling back up past
// it does dim it again, since you've un-reached it.
function initTimelineScroll() {
	const wrap = document.querySelector('.shift__timeline-wrap');
	if (!wrap) return;

	const fill = wrap.querySelector('.shift__line-fill');
	if (fill) {
		gsap.to(fill, {
			scaleY: 1,
			ease: 'none',
			scrollTrigger: {
				trigger: wrap,
				start: 'top center',
				end: 'bottom center',
				scrub: true,
			},
		});
	}

	wrap.querySelectorAll('.shift__row').forEach((row, index) => {
		gsap.set(row, { opacity: index === 0 ? 1 : 0.4 });

		ScrollTrigger.create({
			trigger: row,
			start: 'top center',
			end: 'bottom center',
			onEnter: () => gsap.to(row, { opacity: 1, duration: 0.3, overwrite: true }),
			onEnterBack: () => gsap.to(row, { opacity: 1, duration: 0.3, overwrite: true }),
			onLeaveBack: () => gsap.to(row, { opacity: 0.4, duration: 0.3, overwrite: true }),
			// no onLeave — scrolling past a row going down leaves it lit
		});
	});
}

if (!prefersReducedMotion) {
	document.addEventListener('DOMContentLoaded', () => {
		initHeadingReveals();
		initCardReveals();
		initTimelineScroll();
	});
}
