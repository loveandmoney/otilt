/* eslint-disable react/prop-types */

import React, { Component, useContext } from "react";
import { graphql } from "gatsby";
import { AppContext } from "~context/AppContext";
import Layout from "~components/Layout";
import SEO from "~components/SEO";
import { fancyLog } from "~utils/helpers";

class IndexPageComponent extends Component {
  componentDidMount() {
    fancyLog(`Index page`);
  }

  //

  render() {
    const { frontmatter, location } = this.props;

    return (
      <>
        <SEO
          customTitle={frontmatter.title}
          customDescription={frontmatter.seoDescription}
          customKeywords={frontmatter.seoKeywords}
          path={location.pathname}
        />

        <Layout className="index-page w-full relative flex flex-col justify-between pt-12">
          <section className="grid">
            <h1 className="grid-end-12 my-8 f3">{frontmatter.title}</h1>
          </section>
        </Layout>
      </>
    );
  }
}

//

const IndexPage = ({ data, location }) => {
  const appContext = useContext(AppContext);
  const { frontmatter } = data.markdownRemark;

  return (
    <IndexPageComponent
      appContext={appContext}
      frontmatter={frontmatter}
      location={location}
    />
  );
};

export default IndexPage;

export const query = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        seoDescription
        seoKeywords
      }
    }
  }
`;
