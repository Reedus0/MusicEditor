export const getOffset = (element: any): { elementX: number, elementY: number } => {
    const rect = element.getBoundingClientRect();
    return {
        elementX: rect.left + window.scrollX,
        elementY: rect.top + window.scrollY
    };
}