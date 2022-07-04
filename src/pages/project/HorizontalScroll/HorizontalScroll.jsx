import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import { LeftArrow, RightArrow } from "./arrows";
import "./globalStyles.css";
import usePreventBodyScroll from "./usePreventBodyScroll";

// NOTE: embrace power of CSS flexbox!
import "./hideScrollbar.css";
import Section from "../../../Components/Section/Section";
import AddButton from "../../../Components/AddButton/AddButton";

function onWheel(apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

const HorizontalScroll = ({
    subTaskTree,
    subTasks,
    sectionNames,
    updateTaskCompleted
}) => {
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  if (!subTaskTree) {
      return (<div>No Subtasks</div> )
  }
  const numSections = Math.max(...Object.values(subTaskTree).map(o => o.sectionIdx)) + 1
  const sectionTasks = Array.from(Array(numSections), () => Array(0))
  // for each section, create a Section Component and add to the page
  Object.entries(subTaskTree).forEach(element => {
    const taskId = element[0]
    const obj = element[1]

    const {
      sectionIdx,
    } = obj

    sectionTasks[sectionIdx].push({
      ...obj,
      taskId,
    });
  });

  const sections = sectionTasks.map((st, idx) => {
    return (
        <Section 
        sectionName={sectionNames[idx]}
        subTasks={subTasks} 
        subTaskTree={st} 
        itemId={`section-${idx}`} // NOTE: itemId is required for track items
        key={`section-${idx}`}
        updateTaskCompleted={updateTaskCompleted}
        />
    )
  })

  return (
    <>
      <div className="example" style={{ paddingTop: "10px", height: "80vh" }}>
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onWheel={onWheel}
          >
            {sections}
            <AddButton />
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}

export default HorizontalScroll;
