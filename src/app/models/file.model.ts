
export interface FileModel {
    name: string;
    lastModified: number;
    lastModifiedDate: Date;
    size: number;
    type: string;
    webkitRelativePath: string;
}


export interface FileCompare {
    changeCount: string;
    class: string;
    folder: string;
    icon: string;
    level: string;
    name: string;
    size: string | number;
    timestamp: string;
    lastModified?: number;
    lastModifiedDate?: Date;
    webkitRelativePath?: string;
    tipo?: string;
}