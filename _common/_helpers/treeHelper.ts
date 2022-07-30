import _ from "lodash";

export type PlainTree<TNode, TLeaf> = TNode extends { [key: string]: any }
    ? { [P in keyof TNode]: PlainTree<TNode[P], TLeaf> }
    : TLeaf;

export type Tree<TNode, TLeaf> = TNode extends TLeaf
    ? { $$node: false; value: TLeaf }
    : { $$node: true; children: { [P in keyof TNode]: Tree<TNode[P], TLeaf> } };

export function generateTree<TNode, TLeaf>(
    obj: PlainTree<TNode, TLeaf> | undefined,
    isLeaf: (obj: PlainTree<TNode, TLeaf> | TLeaf) => boolean = _.negate(_.isPlainObject),
): Tree<TNode, TLeaf> {
    const tree = { $$node: true, children: {} };
    for (const key in obj) {
        if (key) {
            const value = obj[key] as PlainTree<TNode, TLeaf> | TLeaf;
            if (isLeaf(value)) (tree.children as any)[key] = { $$node: false, value: value as TLeaf };
            else {
                (tree.children as any)[key] = {
                    $$node: true,
                    children: generateTree(value as PlainTree<TNode, TLeaf>, isLeaf),
                };
            }
        }
    }
    return tree as Tree<TNode, TLeaf>;
}

export function iterateTree<TNode, TLeaf>(
    tree: Tree<TNode, TLeaf> | undefined,
    onLeaf: (value: TLeaf, path: string[]) => void,
    path?: string[],
) {
    if (!tree) return;

    if (tree.$$node) {
        for (const key in (tree as any).children) {
            const node = (tree as any).children[key];
            const childPath = [...(path || []), key];
            if (node.$$node) iterateTree(node.children, onLeaf, childPath);
            else onLeaf(node.value, childPath);
        }
    } else onLeaf((tree as any).value, []);
}

export function iteratePlainTree<TNode, TLeaf>(
    obj: PlainTree<TNode, TLeaf> | undefined,
    onLeaf: (value: TLeaf, path: string[]) => void,
    isLeaf: (obj: PlainTree<TNode, TLeaf> | TLeaf) => boolean = _.negate(_.isPlainObject),
) {
    iterateTree(generateTree(obj, isLeaf), onLeaf);
}

export function transformPlainTree<TNode, TLeaf, TNewLeaf>(
    obj: PlainTree<TNode, TLeaf> | undefined,
    transformLeaf: (value: TLeaf) => TNewLeaf,
    isLeaf: (obj: PlainTree<TNode, TLeaf> | TLeaf) => boolean = _.negate(_.isPlainObject),
): PlainTree<TNode, TNewLeaf> {
    const transformedTree = {};
    iteratePlainTree(
        obj,
        (value, path) => {
            _.set(transformedTree, path, transformLeaf(value));
        },
        isLeaf,
    );
    return transformedTree as PlainTree<TNode, TNewLeaf>;
}
