import { Link, useLocation } from 'react-router-dom';
import { routes } from 'appConstants';
import { Button, Logo, Text, TextInput } from 'components';
import { observer } from 'mobx-react';
import cn from 'classnames';
// import { useMst } from 'store';

import styles from './styles.module.scss';
import { useEffect, useState } from 'react';

const Footers: React.FC = observer(() => {
  const history = useLocation();

  const { pathname } = history;
  const [isClassName, setIsClassName] = useState(false);
  // const { user } = useMst();

  // const accountHelperObject = [
  //   {
  //     label: 'Download',
  //     link: routes.profile.root,
  //   },
  //   {
  //     label: 'Demos',
  //     link: `${routes.profile.root}/favourite`,
  //   },
  //   {
  //     label: 'Support',
  //     link: `${routes.profile.root}/myCollectction`,
  //   },
  // ];

  const stacks = [
    {
      label: 'Explore',
      link: routes.discover.root,
    },
    {
      label: 'Connect wallet',
      link: routes.connectWallet.root,
    },
    {
      label: 'Create item',
      link: routes.create.root,
    },
  ];

  useEffect(() => {
    setIsClassName(routes.connectWallet.root === pathname);
  }, [pathname]);

  return (
    <footer className={styles.footer}>
      <div
        className={cn(styles.footerContent, {
          [styles.absolute]: isClassName,
        })}
      >
        <div className={styles.linksAndControls}>
          <div className={styles.footerLogo}>
            <Logo className={styles.logo} />
            <Text size="xl" weight="bold" color="black">
              The New Creative Economy
            </Text>
          </div>
          <div className={styles.linkBlock}>
            <Text weight="bold" size="m">
              Stacks
            </Text>
            {stacks.map(({ label, link }) => {
              return (
                <Link to={link} key={label}>
                  <Button padding="0" className={styles.button} color="transparent">
                    <Text color="lightGray">{label}</Text>
                  </Button>
                </Link>
              );
            })}
          </div>
          {/* {user.address && (
            <div className={styles.linkBlock}>
              <Text weight="bold" size="m">
                Info
              </Text>
              {accountHelperObject.map(({ label, link }) => {
                return (
                  <Link to={link} key={label}>
                    <Button className={styles.button} color="transparent">
                      <Text color="lightGray">{label}</Text>
                    </Button>
                  </Link>
                );
              })}
            </div>
          )} */}
          <div className={styles.footerActions}>
            <Text color="black" weight="bold" size="m">
              Join Newsletter
            </Text>
            <Text color="lightGray" size="m">
              Subscribe our newsletter to get more free design course and resource
            </Text>
            <TextInput isButton placeholder="Enter your email" type="text" />
          </div>
        </div>
        <div className={styles.copyrightBlock}>
          <Text color="gray">Copyright © 2021 Lessnft LLC. All rights reserved</Text>
        </div>
      </div>
    </footer>
  );
});

export default Footers;
