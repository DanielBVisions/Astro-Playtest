import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Wraps every word of a heading in <span class="word"><span class="word-inner">word</span></span>
// so each word can slide up independently, while leaving existing markup
// (accent color spans, <br>) untouched — text nodes are the only thing split.
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
					const outer = document.createElement('span');
					outer.className = 'word';
					const inner = document.createElement('span');
					inner.className = 'word-inner';
					inner.textContent = part;
					outer.appendChild(inner);
					frag.appendChild(outer);
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
		const words = heading.querySelectorAll('.word-inner');
		if (!words.length) return;

		gsap.set(words, { yPercent: 110 });
		gsap.to(words, {
			yPercent: 0,
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
	const groupSelectors = ['.pillars__grid', '.values__grid', '.team__grid', '.shift__timeline'];

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

if (!prefersReducedMotion) {
	document.addEventListener('DOMContentLoaded', () => {
		initHeadingReveals();
		initCardReveals();
	});
}
