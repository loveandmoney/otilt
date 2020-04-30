/* eslint-disable react/prop-types */
// import { PropTypes } from "prop-types";

import React, { Component, useContext } from "react";
import { graphql } from "gatsby";
import { AppContext } from "~context/AppContext";
import Layout from "~components/Layout";
import SEO from "~components/SEO";
import { fancyLog } from "~utils/helpers";

class InternPageComponent extends Component {
  state = {
    openCalendarSquare: null
  };

  numDummyDays = 31;

  // This is good
  dummyDayData = Array(this.numDummyDays)
    .fill(null)
    .map((_, i) => {
      return {
        dayCount: i + 1,
        date: `${i + 1}.7`,
        learned: `I learned this thing`
      };
    });

  componentDidMount() {
    fancyLog(`Intern page`);
  }

  //
  // dc : I use '//' like the line above to separate JSX and SCSS into logical sections, helps when scrolling through big files

  handleClick = e => {
    // dc : removed redundant variable
    this.setState({
      openCalendarSquare: parseInt(
        e.currentTarget.attributes.getNamedItem(`data-day-count`).value
      )
    });
  };

  handleMouseLeave = () => {
    // dc : if you mouseleave any square, none are active
    this.setState({
      openCalendarSquare: null
    });

    // const day = parseInt(
    //   e.currentTarget.attributes.getNamedItem(`data-day-count`).value
    // );

    // If we just mouse-exited the current open square, then close it
    // if (this.state.openCalendarSquare === day) {
    //   this.setState({
    //     openCalendarSquare: null
    //   });
    // }
  };

  //

  render() {
    const { frontmatter, location } = this.props;

    // dc : use top-line object destructuring to prevent repeating "this.state" or "this.props" in the JSX
    const { openCalendarSquare } = this.state;

    return (
      <>
        <SEO
          customTitle={frontmatter.title}
          customDescription={frontmatter.seoDescription}
          customKeywords={frontmatter.seoKeywords}
          path={location.pathname}
        />

        {/* dc : removed all custom BEM classes; 100% Tailwind */}
        {/* dc : bump the padding-bottom */}
        <Layout className="intern-page w-full relative flex flex-col justify-between pt-12 pb-48 bg-black text-white">
          {/* dc : rather than px-40 we can just <br> the text where we need to */}
          {/* dc : added classes to fonts.scss (f1, f2, f3, f4, b1, b2, b3) */}
          {/* dc : adjusted margins/padding */}
          {/* dc : removed redundant 'banner' class */}
          <section className="w-full h-screen flex flex-col justify-center text-center">
            <h3 className="b2">IN TERN PRESENTS</h3>

            <h1 className="mt-6 mb-12 f1 font-bold">
              One Thing I <br />
              Learned Today
            </h1>

            <p className="b2">FOR THREE MONTHS. AT LOVE + MONEY.</p>
            <p className="mt-1 b2">200 GERTRUDE STREET, FITZROY, INTERNET.</p>
            <p className="mt-1 f2">&#x2193;</p>
          </section>

          {/* dc : moved px-40 to parent container to prevent duplicate definition in children */}
          {/* dc : reduced padding (px-40 too much) */}
          <section className="w-full flex flex-col px-24">
            {/* dc : changed to ol */}
            {/* dc : added classes from fonts.scss */}
            {/* dc : adjusted padding */}
            <ol className="flex text-center">
              <li className="w-1/5 py-3 f4">M</li>
              <li className="w-1/5 py-3 f4">T</li>
              <li className="w-1/5 py-3 f4">W</li>
              <li className="w-1/5 py-3 f4">T</li>
              <li className="w-1/5 py-3 f4">F</li>
            </ol>

            {/* dc : changed to ol (my bad - days are 'ordered') */}
            <ol className="flex flex-wrap">
              {this.dummyDayData.map(({ dayCount, date, learned }, index) => {
                const thisSquareIsActive = openCalendarSquare === dayCount;

                // dc : added booleans to help describe your border checks
                // dc : changed border-* class checks to ternaries; if you don't use ternaries, you'll get things like 'undefined' or 'false' rendered as classNames

                const withBorderBottom = index >= this.dummyDayData.length - 5;
                const withBorderRight =
                  (index + 1) % 5 === 0 ||
                  index === this.dummyDayData.length - 1;

                // dc : shift border-white class to front to group position attributes together
                // dc : order position classes per CSS spec: top, right, bottom, left (yes, I'm a hopeless fucking pedant)
                return (
                  <li
                    key={dayCount}
                    className={`w-1/5 relative border-dotted border-white border-t-2 ${
                      withBorderRight ? `border-r-2` : ``
                    } ${withBorderBottom ? `border-b-2` : ``} border-l-2 `}
                  >
                    {/* dc : changed thisSquareIsActive && cursor-default to ternary */}
                    {/* dc : added block class to buttons (days weren't square) */}
                    <button
                      type="button"
                      className={`square relative block ${
                        thisSquareIsActive ? `cursor-default` : ``
                      }`}
                      onClick={this.handleClick}
                      data-day-count={dayCount}
                      onMouseLeave={this.handleMouseLeave}
                    >
                      <div className="w-full h-full absolute top-0 p-4 flex flex-col justify-between">
                        {/* dc : using semantic text tags */}
                        <h3 className="self-end">{date}</h3>
                        <h2 className="self-start text-2xl font-medium">{`Day ${dayCount}`}</h2>
                      </div>

                      {/* dc : you don't need a '--clicked' class since you have thisSquareIsActive already */}
                      <div
                        className={`${
                          thisSquareIsActive ? `opacity-100` : `opacity-0`
                        } transition-opacity w-full h-full absolute top-0 p-4 bg-white text-black text-left font-medium`}
                      >
                        {learned}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </section>
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
