/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />


export type DropEvent {
  detail: {
    acceptedFiles: File[],
    fileRejections: File[]
  }
}

export type FileState {
  accepted: File[],
  rejected: File[]
}
