import mainMenuVideo from "./assets/main_menu_asset.mp4";

export default function MainMenuBackground() {
  return (
    <video
      src={mainMenuVideo}
      autoPlay
      loop
      muted
      playsInline
      className="mm-video"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitUserDrag: "none",
        pointerEvents: "none",
      }}
    />
  );
}
