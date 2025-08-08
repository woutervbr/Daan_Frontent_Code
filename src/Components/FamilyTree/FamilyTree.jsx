import React, { Component } from "react";
import styled from "styled-components";
import Member from "./Member";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => `${props.level * 30}px`};
  /* margin-top: 30px; */
`;

export default class FamilyTree extends Component {
  hasChildren(member) {
    return member.children && member.children.length;
  }
  render() {
    const level = this.props.level || 0;
    return (
      <>
        <StyledWrapper level={level}>
          {this.props.members?.map((member, i) => {
            // Odd money / Even number
            const isEven = i % 2 === 0;
            return (
              <div key={`level-${level}-${i}`}>
                <Member {...member} />
                {this.hasChildren(member) && (
                  <FamilyTree members={member.children} level={level + 1} />
                )}
              </div>
            );
          })}
        </StyledWrapper>
      </>
    );
  }
}
