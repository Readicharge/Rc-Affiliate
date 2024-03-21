import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function SalesItem({ avatarSrc, avatarFallback, name, email, amount }:any) {
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src={avatarSrc} alt="Avatar" />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
      <div className="ml-auto font-medium">{`+$${amount.toFixed(2)}`}</div>
    </div>
  );
}

export function RecentSales({ transactions }:any) {
  return (
    <div className="space-y-8">
      {transactions?.slice(0, 6).map((transaction:any, index:any) => (
        <SalesItem key={index} {...transaction} />
      ))}
    </div>
  );
}
