import { Button } from "@/components/ui/button";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { CardType } from "@/types/Card";

interface CardDemoProps {
  card: CardType;
}

export function CardDemo({ card }: CardDemoProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{card.label}</CardTitle>

        <CardDescription>{card.id}</CardDescription>
      </CardHeader>

      {/* <CardContent>


</CardContent> */}

      <CardFooter className="flex-col gap-2">
        <Button variant={"outline"} className="w-full">
          View Customer Info
        </Button>
      </CardFooter>
    </Card>
  );
}
