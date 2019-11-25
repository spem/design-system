import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { Box, Grommet, ResponsiveContext } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { AnchorGroup, Nav } from 'aries-core';
import { SideBar, SideBarItemList } from '../navigation';

const filterChildren = (children, type) => {
  const filteredChildren = React.Children.map(children, child => {
    return child.props[type] ? child : null;
  });

  if (filteredChildren.length > 1) {
    console.warn(
      `Expected a single ${type}, received ${filteredChildren.length}.`,
      `Only first ${type} element will be rendered.`,
    );
  }

  return filteredChildren;
};

export const Layout = ({ children, title }) => {
  // Only expect a single child of the following types
  const mainContent = filterChildren(children, 'MainContent');

  // TODO selectedNav should be retrived from aries-core
  // as the selected element of the NavBar
  const selectedNav = 'start';

  return (
    <Grommet theme={hpe} full>
      <ResponsiveContext.Consumer>
        {size => (
          <>
            <Head>
              <link rel="icon" href="/static/favicon.ico" />
              <title>
                {title ? `${title} — Aries` : 'Aries | HPE Design System'}
              </title>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
            </Head>
            <Nav title="Aries">
              <AnchorGroup
                items={[
                  { label: 'Start', href: '/start' },
                  { label: 'Foundation', href: '/foundation' },
                  { label: 'Design', href: '/design' },
                  { label: 'Develop', href: '/develop' },
                  { label: 'Resources', href: '/resources' },
                ]}
              />
            </Nav>
            <Box
              direction="row"
              // pad uses Nav pad from aries-core
              pad={{
                horizontal: size !== 'small' ? 'xlarge' : 'large',
                vertical: 'large',
              }}
            >
              {size !== 'small' && (
                <Box fill="vertical">
                  <SideBar
                    items={SideBarItemList[selectedNav]}
                    prefix={selectedNav}
                  />
                </Box>
              )}
              <Box flex>{mainContent[0]}</Box>
            </Box>
          </>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  title: PropTypes.string,
};

Layout.defaultProps = {
  title: undefined,
};