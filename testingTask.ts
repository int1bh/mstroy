type TreeNode = {
  id: number | string;
  parent: number | 'root';
  type?: string | null;
}

class TreeStore {
   /**
   * Массив элементов, принимаемых классом
   */
  inputArray: TreeNode[];

  /**
   * Создать экземпляр класса TreeStore
   * @param { TreeNode[] } array - Принимаемый на вход массив
   */
  constructor(array: TreeNode[]) {
    this.inputArray = array;
  }

  /**
   * Возвращает изначальный массив элементов
   */
  getAll(): TreeNode[] {
    return this.inputArray;
  }

  /**
   * Находит узел по его идентификатору.
   * @param {number} id - Идентификатор узла.
   * @returns {TreeNode | undefined} - Найденный узел или undefined, если узел не найден.
   */
  getItem(id: number | string): TreeNode | undefined {
     return this.inputArray.find((item) => item.id === id);
  }

  /**
   * Возвращает дочерние узлы для указанного родительского узла.
   * @param {number | 'root'} parentId - Идентификатор родительского узла или 'root' для корневого узла.
   * @returns {TreeNode[]} - Массив дочерних узлов.
   */
  getChildren(parentId: number | string | 'root'): TreeNode[] {
    return this.inputArray.filter((input) => input.parent === parentId) || [];
  }

  /**
   * Принимает id элемента и возвращает массив элементов, являющихся его прямыми дочерними элементами
   * @param { number | 'root' } parentId - Идентификатор родительского узла или 'root' для корневого узла.
   * @returns { TreeNode[] } - Массив всех дочерних узлов.
   */
  getAllChildren(parentId: number | 'root'): TreeNode[] {
    const descendants: TreeNode[] = [];
    
    const findDescendants = (parentId: number | string | 'root') => {
      const children = this.getChildren(parentId);
      descendants.push(...children);

      children.forEach((child) => {
        if (child.parent !== 'root') {
          findDescendants(child.id);
        }
      });
    };

    findDescendants(parentId);
    return descendants;
  }

    /**
   * возвращает массив из цепочки родительских элементов
   * @param { number } id - Идентификатор узла.
   * @returns { TreeNode[] } - Массив узлов, включая указанный узел и его родительские элементы.
   */
  getParentNodes(id: number): TreeNode[] {
    const result: TreeNode[] = [];
    const findNodeById = (nodeId: number | 'root'): void => {
      const node = this.inputArray.find((node) => node.id === nodeId);
      if (node) {
        result.push(node);
        if (node.parent !== 'root') {
          findNodeById(node.parent);
        }
      }
    };
    
    findNodeById(id);
    return result;
  }
}

const items: TreeNode[] = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items);
console.log(ts.getAll());
console.log(ts.getItem(1));
console.log(ts.getChildren(4));
console.log(ts.getAllChildren(1));
console.log(ts.getParentNodes(7));
