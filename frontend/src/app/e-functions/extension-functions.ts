import {environment} from "../../environments/environment";

export function myTrackBy(index: number, item: any): number {
    return item.id ?? index;
}

export function addMapApiHeader(onLoad: () => void) {
  if (!document.getElementById("map-script")) {
    const script = document.createElement("script");
    script.id = "map-script";
    script.type = "text/javascript";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.MAP_KEY}&callback=gmNoop`;
    script.onload = () => {
      onLoad();
    };
    document.head.appendChild(script);
  } else {
    onLoad();
  }
}

export function genUUID(): string {
  return crypto.randomUUID();
}
