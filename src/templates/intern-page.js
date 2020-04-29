/* eslint-disable react/prop-types */
// import { PropTypes } from "prop-types";

import React, { Component, useContext } from "react";
import { graphql } from "gatsby";
import { AppContext } from "~context/AppContext";
import Layout from "~components/Layout";
import SEO from "~components/SEO";
import { fancyLog } from "~utils/helpers";

class InternPageComponent extends Component {
  state = {};

  componentDidMount() {
    fancyLog(`Intern page`);
  }

  //

  //
  // those affect the state variables

  // handleClick = () => {}
  // handleHover = () => {}

  //

  render() {
    const { frontmatter, location } = this.props;

    // @Will you'll be spending most of your time in here

    return (
      <>
        <SEO
          customTitle={frontmatter.title}
          customDescription={frontmatter.seoDescription}
          customKeywords={frontmatter.seoKeywords}
          path={location.pathname}
        />

        <Layout className="intern-page w-full relative flex flex-col justify-between pt-12">
          {/* banner section */}

          {/* calendar section */}
          {/* - fixed M-F elements at the top */}
          {/* - grid with hover effects and click effects */}

          {/* Use tailwind where possible */}

          {/* <section className="grid">
            <h1 className="grid-end-12 my-8 f3">{frontmatter.title}</h1>
          </section> */}
        </Layout>
      </>
    );
  }
}

//

const InternPage = ({ data, location }) => {
  const appContext = useContext(AppContext);
  const { frontmatter } = data.markdownRemark;

  return (
    <InternPageComponent
      appContext={appContext}
      frontmatter={frontmatter}
      location={location}
    />
  );
};

export default InternPage;

export const query = graphql`
  query InternPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        seoDescription
        seoKeywords
      }
    }
  }
`;
