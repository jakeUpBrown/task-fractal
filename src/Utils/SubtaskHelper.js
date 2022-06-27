export const taskArrayToMap = (subTasks) => {
    if (!!!subTasks || subTasks.length == 0) {
        return {};
    }
    const subTaskMap = {}
    subTasks.forEach(t => {
        subTaskMap[t.taskId] = t;
    })
    return subTaskMap
}