import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Open Source',
    Svg: require('@site/static/img/undraw_open_source.svg').default,
    description: (
      <>
        Our goal is to create Open Source projects widely accessible for any type of projects.
      </>
    ),
  },
  {
    title: 'Community-Driven',
    Svg: require('@site/static/img/undraw_community.svg').default,
    description: (
      <>
        Our projects want to be driven by a vibrant community of contributors and users. Join us to collaborate and innovate together.
      </>
    )
  },
  {
    title: 'Highly Documented',
    Svg: require('@site/static/img/undraw_my_documents.svg').default,
    description: (
      <>
        Comprehensive documentation is provided to help you get started quickly and understand our projects in depth.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
