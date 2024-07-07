interface HeadingProps {
  title: string
}

export const Heading = ({ title }: HeadingProps) => {
  return (
    <h1 className="text-3xl font-bold tracking-tighter">
      {title}
      <div className="h-1.5 w-10 bg-primary/90 rounded-full" />
    </h1>
  )
}
