import { GetFunctionParams } from '../types/common';
export declare function deepClone<T = any>(obj: T, cache?: Map<any, any>): T;
export declare function debounce<T extends (...params: any) => any>(callback: T, delay?: number): (...args: GetFunctionParams<T>) => void;
