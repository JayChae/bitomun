export default function BackgroundDecoration() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="from-primary/5 via-secondary/5 absolute inset-0 bg-gradient-to-br to-transparent" />
      <div className="bg-primary/10 absolute top-20 left-1/4 h-72 w-72 rounded-full blur-3xl" />
      <div className="bg-secondary/10 absolute right-1/4 bottom-20 h-96 w-96 rounded-full blur-3xl" />
    </div>
  );
}
