import "react"

declare module "react" {
  interface DetailedHTMLProps<T> extends HTMLAttributes<T> {
    webkitdirectory?: string;
  }

}