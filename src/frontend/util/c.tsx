export function c(...classLikeList: ({ [key: string]: boolean; } | string)[]): string {
    const classes: string[] = [];
    for (const classLike of classLikeList) {
        if (typeof classLike === 'string') {
            classes.push(classLike);
        } else {
            for (const subClass in classLike) {
                if (classLike[subClass]) {
                    classes.push(subClass);
                }
            }
        }
    }
    return classes.join(' ');
}
