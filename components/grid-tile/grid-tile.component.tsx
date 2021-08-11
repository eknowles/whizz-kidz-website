import React, { useEffect } from 'react';
import cx from 'classnames';

import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export interface IGridTileProps {
  title: string;
	bodyText: string;
	backgroundText: string;
	fontSizeTitle: number;
  isBig?: boolean;
  className?: string;
  backgroundColor?: string;
}

/** Tile used as a category in a grid layout, acts as a button or link */
const GridTile: React.FC<IGridTileProps> = ({
  title,
	fontSizeTitle,
	bodyText,
	backgroundText,
  isBig,
  className = '',
  backgroundColor = 'bg-yellow-400'
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
			<div
				className={cx(
					'has-focus w-full h-full px-8 py-5 sm:p-8 text-2xl font-bold text-left text-white rounded-lg flex items-center',
					{
						'text-3xl md:text-5xl': isBig,
					},
					backgroundColor
				)}
			>
				<div className="flex justify-between flex-col sm:grid sm:gap-4 items-start w-full">
					<div className="block">
						<h4 className="mr-4 sm:mr-0 my-3 px-3 clone inline whitespace-pre-wrap " style={{backgroundColor:backgroundText, fontSize:`${fontSizeTitle}px`}}>{title}</h4>
					</div>
					<div className="block">
						<p className="p-3 inline whitespace-pre-wrap clone" style={{backgroundColor:backgroundText}}>{bodyText}</p>
					</div>
				</div>
			</div>
    </motion.li>
  );
};

export default GridTile;
