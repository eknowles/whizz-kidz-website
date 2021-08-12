import Link from 'next/link';
import React, { useEffect } from 'react';
import cx from 'classnames';

import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export interface IGridTileProps {
  label: string;
  isBig?: boolean;
  className?: string;
  backgroundColor?: string;
  linkProps: any; // next.js link props
}

/** Tile used as a category in a grid layout, acts as a button or link */
const GridTile: React.FC<IGridTileProps> = ({
  label,
  isBig,
  className = '',
  backgroundColor = 'bg-yellow-400',
  linkProps = { href: '/' },
}) => {
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.li
      className={className}
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0, transition: { delay: 0.075 } },
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
      }}
    >
      <Link {...linkProps}>
        <a
          className={cx(
            'has-focus w-full h-full px-8 py-5 sm:p-8 text-2xl font-bold text-left text-gray-900 rounded-lg flex items-center hover:underline',
            {
              'text-3xl md:text-5xl': isBig,
            },
            backgroundColor
          )}
        >
          <div className="flex justify-between items-center sm:grid sm:gap-4 w-full">
            <span className="mr-4 sm:mr-0">{label}</span>
            <span
              className="bg-white rounded-full shadow p-2"
              style={{ width: 'min-content' }}
            >
              <svg
                role="presentation"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="stroke-current w-8 h-8"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </a>
      </Link>
    </motion.li>
  );
};

export default GridTile;
