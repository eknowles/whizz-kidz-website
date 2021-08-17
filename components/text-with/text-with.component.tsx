import cx from 'classnames';
import { useReducedMotion } from 'framer-motion';
import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import CallToAction, {
  ICallToActionProps,
} from '../call-to-action/call-to-action.component';
import Container from '../container';
import Statement from '../statement';
import { IStatementProps } from '../statement/statement.component';

export interface ITextWithProps extends IStatementProps {
  transparentBackground?: boolean;
  imagePosition: 'left' | 'right';
  callToAction?: ICallToActionProps;
	backgroundHeading?: string|'transaparent';
}

const TextWith: React.FC<ITextWithProps> = ({
  children,
  heading,
  eyebrow,
  text,
  imagePosition = 'right',
	imageDescription,
  transparentBackground,
	backgroundHeading,
  callToAction,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const headerElement = eyebrow ? 'eyebrow' : 'heading';

  return (
    <Container as="section">
      <div
        className={cx(
          'grid items-center my-10 md:my-20 lg:my-40 lg:grid-cols-5',
          {
            'bg-gray-100': !transparentBackground,
          }
        )}
      >
        <div
          className={cx('grid gap-8 p-8 lg:p-16 lg:row-start-1 lg:row-end-2', {
            'lg:col-start-3 lg:col-end-6': imagePosition === 'left',
            'lg:col-start-1 lg:col-end-4': imagePosition === 'right',
          })}
        >
          <Statement
            heading={heading}
            eyebrow={eyebrow}
            text={text}
            headerElement={headerElement}
            hasEyebrowStyle
						backgroundHeading={backgroundHeading}
          />
          {callToAction && (
            <div>
              <CallToAction {...callToAction} />
            </div>
          )}
        </div>
        {children && (
          <Parallax
            disabled={!!shouldReduceMotion}
            y={[10, -10]}
            x={[2, 0]}
            className={cx('lg:row-start-1 lg:row-end-2 max-w-lg mb-8 lg:mb-0', {
              'lg:col-start-1 lg:col-end-3': imagePosition === 'left',
              'lg:col-start-4 lg:col-end-6': imagePosition === 'right',
            })}
          >
            {children}
						{imageDescription && (
							<span>
								{imageDescription}
							</span>
						)}
          </Parallax>
        )}
      </div>
    </Container>
  );
};

export default TextWith;
