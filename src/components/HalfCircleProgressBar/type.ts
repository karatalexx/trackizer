export interface HalfCircleProgressBarProps {
    data: GenerateSvgPath[];
    limitValue: number;
}

interface GenerateSvgPath {
    value: number;
    color: string;
}

export interface DonutData {
    stroke: string;
    dashoffset: number;
    dashArray: number[];
}

export interface ValueFromGenerateSvgPath {
    [key: string]: {
        d: string;
        strokeWidth: string;
        strokeLinecap?: 'round' | 'butt' | 'square' | 'inherit';
        stroke: string;
        strokeDasharray:string;
        strokeDashoffset: number;
    };
}
