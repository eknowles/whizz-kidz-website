import cx from 'classnames';
import React, { useContext } from 'react';
import BrandContext from '../../lib/brand-context';

export interface IStatementProps {
  eyebrow?: React.ReactNode;
  heading?: React.ReactNode;
	backgroundHeading?: string;
  text?: React.ReactNode;
  isCentered?: boolean;
  hasBigHeading?: boolean;
  headerElement?: 'eyebrow' | 'heading';
  headerLevel?: number;
  hasEyebrowStyle?: boolean;
  className?: string;
	imageDescription?: string;
}

const Statement: React.FC<IStatementProps> = ({
  eyebrow,
  heading,
	backgroundHeading,
  text,
  isCentered = false,
  hasBigHeading = false,
  headerElement = 'eyebrow',
  headerLevel = 2,
  className,
  hasEyebrowStyle,
}) => {
  const { smallTextColor } = useContext(BrandContext);
  const eyebrowElement = React.createElement(
    headerElement === 'eyebrow' ? `h${headerLevel}` : 'div',
    {
      className: cx(
        'mb-3',
        {
          'uppercase font-bold tracking-wider': hasEyebrowStyle,
					[`${smallTextColor}`]: !backgroundHeading,
					'text-white px-2 py-1': backgroundHeading,
        }
      ),
			style: {
				background: backgroundHeading,
				display: 'inline'
			}
    },
    eyebrow
  );

  const headingElement = React.createElement(
    headerElement === 'heading' ? `h${headerLevel}` : 'p',
    {
      className: cx(`font-bold leading-snug clone`, {
        'text-4xl': !hasBigHeading,
        'text-6xl': hasBigHeading,
				'text-gray-700': !backgroundHeading,
				'text-white px-2 py-1': backgroundHeading,
      }),
			style: {
				background: backgroundHeading,
				display: 'inline'
			}
    },
    heading
  );
	const textBody = {__html: `${text}`}

  return (
    <div className={cx({ 'text-center': isCentered }, className)}>
      <div className="block my-3">{eyebrow && eyebrowElement}</div>
      <div className="block">{heading && headingElement}</div>
      {text && <p className="mt-3 text-2xl font-light text-gray-700" dangerouslySetInnerHTML={textBody}></p>}
    </div>
  );
};

export default Statement;
