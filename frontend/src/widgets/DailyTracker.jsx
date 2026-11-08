import React from "react";

const img_path_sets = [
  [
    "/assets/Tree1_grey.png",
    "/assets/Tree2_grey.png",
    "/assets/Tree3_grey.png",
  ],
  [
    "/assets/Tree1_green.png",
    "/assets/Tree2_grey.png",
    "/assets/Tree3_grey.png",
  ],
  [
    "/assets/Tree1_green.png",
    "/assets/Tree2_green.png",
    "/assets/Tree3_grey.png",
  ],
  [
    "/assets/Tree1_green.png",
    "/assets/Tree2_green.png",
    "/assets/Tree3_green.png",
  ],
];

const DailyTrackerApp = ({ actionCount }) => {
  const count = Number.isInteger(actionCount)
    ? Math.min(Math.max(actionCount, 0), 3)
    : 0;
  const images = img_path_sets[count];
  return (
    <>
      <div className="dailytracker">
        <img src={images[0]} alt="tree1"></img>
        <img src={images[1]} alt="tree2"></img>
        <img src={images[2]} alt="tree3"></img>
      </div>
    </>
  );
};

export default DailyTrackerApp;
