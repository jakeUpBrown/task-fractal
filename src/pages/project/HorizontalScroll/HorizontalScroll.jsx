import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import { LeftArrow, RightArrow } from "./arrows";
import "./globalStyles.css";
import usePreventBodyScroll from "./usePreventBodyScroll";

// NOTE: embrace power of CSS flexbox!
import "./hideScrollbar.css";
import Section from "../../../Components/Section/Section";
import AddSectionButton from "../../../Components/Section/AddSectionButton";

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
  project,
  taskPath,
  parentTaskId,
  subTaskTree,
  subTasks,
  sectionNames,
  numSections,
  updateTaskCompleted,
  updateTaskInfo,
  updateProjectInfo,
  createTask,
}) => {
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  var sections = null;
  const sectionTasks = Array.from(Array(numSections || 0), () => Array(0))
  // for each section, create a Section Component and add to the page
  if (subTaskTree) {
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
  }

  sections = sectionTasks.map((st, idx) => {
    const uniqueKey = `section-${parentTaskId ? parentTaskId : 'root'}-${idx}`
    return (
      <Section
        project={project}
        taskPath={taskPath}
        parentTaskId={parentTaskId}
        sectionIdx={idx}
        sectionNames={sectionNames}
        subTasks={subTasks}
        subTaskTree={st}
        itemId={uniqueKey} // NOTE: itemId is required for track items
        key={uniqueKey}
        updateTaskCompleted={updateTaskCompleted}
        updateTaskInfo={updateTaskInfo}
        updateProjectInfo={updateProjectInfo}
        createTask={createTask}
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
            <AddSectionButton
              project={project}
              taskPath={taskPath}
              parentTaskId={parentTaskId}
              numSections={numSections}
              updateProjectInfo={updateProjectInfo}
            />
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}

export default HorizontalScroll;
