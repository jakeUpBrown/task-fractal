export const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 36).toString(36)).join('');

export const findPath = (subTaskTree, id, pathStack = []) => {
    // search through all subTaskTree entries
    // if any keys match the id, return pathStack
    for (const [key, value] of Object.entries(subTaskTree)) {
      if (id === key) {
        return pathStack;
      }
      // otherwise, check the subTaskTree of this entry
      if ('subTaskTree' in value) {
        // need to search through the subTaskTree
        pathStack.push(key)
        const result = findPath(value.subTaskTree, id, [...pathStack])
        if (result) { 
          return result; 
        }
        pathStack.pop()
      }
    }
  }