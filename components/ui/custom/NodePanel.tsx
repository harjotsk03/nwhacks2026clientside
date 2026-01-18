import React, { useState, useCallback, useRef } from "react";
import { Plus, Minus, RefreshCcw, MousePointer2 } from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Types ---
interface Agent {
  id: number;
  name: string;
  role: string;
  personality: string;
  backstory: string;
  coffeeRelationship: string;
  voice: string;
  quirks: string;
  x?: number;
  y?: number;
}

interface Position {
  x: number;
  y: number;
}

const agentsData = [
  {
    id: 1,
    name: "Mia",
    role: "Anxious Social Follower",
    personality:
      "Hyper-aware of her status as a newcomer and looks to others to define 'normal' behavior.",
    backstory:
      "Commutes 45 minutes each way; gas prices are her primary financial metric. Her parents give her a small weekly allowance that must cover food, gas, and fun.",
    coffeeRelationship:
      "The cafe is a 'holding cell' between classes. She buys the cheapest item (usually a small tea) to 'rent' her seat and wifi password.",
    voice:
      "Wait, did they like, change the menu? I literally can't afford this if it keeps going up.",
    quirks:
      "Always checks the price board before the counter; packs up her bag the moment her friends stop typing.",
  },
  {
    id: 2,
    name: "Ethan",
    role: "Perpetually Exhausted Student",
    personality:
      "Survives on 5 hours of sleep and pure academic spite. Utility-obsessed and frugal by necessity.",
    backstory:
      "First-gen student with a massive course load; thinks 'free time' is a myth. Lives in a noisy dorm where he can't focus, so the cafe is his only 'office.'",
    coffeeRelationship:
      "Fuel, not Flavor: He would drink battery acid if it had caffeine and cost $1. Buys a small black coffee and nurses it for six hours.",
    voice:
      "I literally haven't slept since Tuesday, please tell me the wifi is working.",
    quirks:
      "Always wears giant noise-canceling headphones (even if they aren't on). Scans the room for the most hidden outlet the second he walks in.",
  },
  {
    id: 3,
    name: "Sara",
    role: "Natural Leader",
    personality:
      "Mom of the group. Socially driven and highly sensitive to collective moods.",
    backstory:
      "Organizes weekly sessions for her major. Feels responsible for keeping the group together.",
    coffeeRelationship:
      "The cafe is a social venue first. Noticed the price hike but prioritizes the 'vibe.'",
    voice:
      "Does everyone still want to stay here? Prices are getting steep, let's keep an eye on it.",
    quirks:
      "Monitors the group's mood; won't fight to stay if the 'market momentum' shifts.",
  },
  {
    id: 4,
    name: "Omar",
    role: "Hyper-Rational Engineer",
    personality:
      "Zero emotional attachment to brands. Hyper-rational and transactional.",
    backstory:
      "Final year engineering; working three TA jobs to graduate debt-free. Grew up in a household where 'eating out' was for birthdays only.",
    coffeeRelationship:
      "Transaction for space. If the 'rent' (coffee price) exceeds the 'utility' (wifi/quiet), he evicts himself.",
    voice:
      "This isn't worth $4.50. I'm paying for the table, not the beans. And the table is wobbly.",
    quirks:
      "Calculates 'per hour' cost of his visit; leaves the second the value proposition fails.",
  },
  {
    id: 5,
    name: "Chloe",
    role: "Emotional Spender",
    personality:
      "Uses lattes to negotiate with her own productivity. Guilt-driven spender.",
    backstory:
      "Uses a 'treat culture' mindset to get through a major she's not sure she likes. Constantly comparing her lifestyle to influencers.",
    coffeeRelationship:
      "The Reward System: Coffee is a prize for finishing a 500-word essay. Downgrades to plain tea when prices rise.",
    voice:
      "I literally can't focus without my little treat, but $6? I'm gonna be sick.",
    quirks:
      "Takes a photo of her coffee for the 'gram before the first sip. Stays longer if the music matches her mood.",
  },
  {
    id: 6,
    name: "Jay",
    role: "Efficient Athlete",
    personality:
      "Time-starved and efficient. Zero patience for 'cafe culture' fluff.",
    backstory:
      "Lives on a strict practice/class schedule. Needs predictable energy boosts.",
    coffeeRelationship:
      "Quick hit of energy. The cafe is a pit stop, not a destination.",
    voice:
      "I've got ten minutes, is the line moving? This is taking way too long, man.",
    quirks:
      "Checks his watch constantly; walks out if more than 3 people are in line.",
  },
  {
    id: 7,
    name: "Priya",
    role: "Observant International Student",
    personality:
      "Observant & calculating. Mentally converts every price to her home currency. Peace-seeker.",
    backstory:
      "Living abroad for the first time; finds the 'tipping culture' and pricing confusing. Misses the slower, communal pace of cafes back home.",
    coffeeRelationship:
      "The Anchor: The cafe is a safe, predictable spot in a country that feels unpredictable.",
    voice:
      "In my head, I am thinking... I could buy a whole meal for this back home.",
    quirks:
      "Never complains to staff; if she's unhappy, she simply never comes back. Always cleans her table perfectly before leaving.",
  },
  {
    id: 8,
    name: "Lucas",
    role: "Social Influencer",
    personality:
      "Socially driven and image-conscious. He goes where the 'cool' people go.",
    backstory:
      "His social life is his highest priority. He doesn't mind a 'clout tax' as long as the place feels lively and popular.",
    coffeeRelationship:
      "The cafe is part of his identity. If it feels 'dead' or the 'wrong' people start coming, he loses interest.",
    voice:
      "This place is kind of dead today, right? Let's go to that new spot.",
    quirks:
      "Spends more when the cafe is full; leaves fast when 'market momentum' drops.",
  },
  {
    id: 9,
    name: "Lina",
    role: "Deep-Work PhD",
    personality:
      "Monastic focus and high tolerance for cost—if the environment is perfect.",
    backstory:
      "PhD candidate who treats the cafe as her actual office. Needs 4+ hours of uninterrupted focus to make progress.",
    coffeeRelationship:
      "High-quality caffeine is a professional tool. Willing to pay more for stability and reliable wifi.",
    voice: "Is there a quiet corner today? I have 3,000 words to get through.",
    quirks:
      "Uses noise-canceling headphones; has a 'favorite' table and feels personally disrupted if it's taken.",
  },
  {
    id: 10,
    name: "Mateo",
    role: "Consistency-Driven Researcher",
    personality:
      "The Ritualist: His day is a series of precise, timed events. Quality critic who calculates inflation rates.",
    backstory:
      "Post-doc researcher; views a cafe as a precision instrument for data entry. Has zero interest in 'trends.'",
    coffeeRelationship:
      "The Baseline: If the coffee is bad, the whole day is 'off-calibration.'",
    voice:
      "The extraction is thin today. If I'm paying more, I expect the quality to hold.",
    quirks:
      "Checks the roast date on the bags by the counter. Always sits in the same 'logical' spot for lighting and ergonomics.",
  },
  {
    id: 11,
    name: "Nadia",
    role: "Lab-to-Lab Regular",
    personality:
      "High-speed operator on a 15-minute transition window. Transactional and values time over money.",
    backstory:
      "PhD student moving between two different labs on campus. Uses the cafe as a mental 'reset' between high-stakes experiments.",
    coffeeRelationship: "The Battery: Needs a quick, predictable charge.",
    voice: "I've got ten minutes. If that line doesn't move, I'm out.",
    quirks:
      "Never sits down; stands near the pickup counter looking at her watch. Uses mobile ordering whenever possible.",
  },
  {
    id: 12,
    name: "Kenji",
    role: "Night Owl Academic",
    personality:
      "Melancholic and peace-seeking. He values the cafe as a 'sanctuary.'",
    backstory:
      "Works in a high-stress lab; lives alone. The baristas are sometimes the only people he talks to.",
    coffeeRelationship:
      "Ritual of comfort. He drinks slowly and stays late. Forgiving of price, but hates loud music.",
    voice:
      "It's okay if the order is wrong, don't worry. I just hope they don't start playing loud music.",
    quirks:
      "Conflict-averse; will stay through bad service just to avoid 'breaking the peace' of the room.",
  },
  {
    id: 13,
    name: "Helen",
    role: "Morning Ritualist",
    personality:
      "Disciplined and traditional. She thrives on being recognized as a 'regular.'",
    backstory:
      "Tenured professor who has sat in the same chair every Tuesday for six years. Money isn't the issue; routine is.",
    coffeeRelationship:
      "A fundamental part of her 'pre-lecture' mental prep. Notices prices but stays for the familiarity.",
    voice: "Good morning, the usual please. Oh, I see the prices have shifted.",
    quirks:
      "Knows the staff's names; notices immediately if the furniture is moved or the routine breaks.",
  },
  {
    id: 14,
    name: "Amir",
    role: "Quality-Focused Academic",
    personality:
      "Friendly but discerning connoisseur. Paying for the craft, not just the cup.",
    backstory:
      "Teaches Philosophy; believes the 'experience' of a cafe is a lost art. Genuinely interested in coffee bean origins.",
    coffeeRelationship:
      "Appreciates a 'perfect' pour-over. Burnt espresso bothers him more than a high price tag.",
    voice: "The body on this roast is a bit thin today, don't you think?",
    quirks:
      "Will quietly move on to a different cafe if the bean quality slips; values a calm, respectful morning.",
  },
  {
    id: 15,
    name: "Grace",
    role: "Comfort Regular",
    personality:
      "The Gentle Observer: Values 'soft' factors—friendliness, warmth, and light. Loyal but fragile.",
    backstory:
      "Senior Professor who has seen the neighborhood change over decades. Has plenty of money, but hates 'greedy' business practices.",
    coffeeRelationship:
      "The Social Hub: Coffee is the excuse to say hello to the baristas.",
    voice:
      "It's getting a bit busy in here, isn't it? I hope they don't lose the charm.",
    quirks:
      "Always tips in cash; asks the baristas how their classes are going. Will leave if the cafe feels 'too much like a library.'",
  },
  {
    id: 16,
    name: "Devon",
    role: "Laptop Camper",
    personality:
      "Efficient and self-aware. He knows he's 'renting' a desk and tries to be a 'good' customer.",
    backstory:
      "Software dev for a startup. His 'office' overhead is just his coffee budget. Needs a stable connection to survive.",
    coffeeRelationship:
      "Transactional workspace. Buys a pastry every 2 hours to avoid 'squatter' guilt.",
    voice:
      "Hey, is that outlet by the window working? I'm gonna be here a while.",
    quirks:
      "Always has a backup battery; checks wifi speed the moment he sits down.",
  },
  {
    id: 17,
    name: "Tessa",
    role: "Meeting-Heavy Freelancer",
    personality:
      "The Professional: Needs the cafe to function as a boardroom. Noise-sensitive.",
    backstory:
      "Freelance consultant; her 'office' overhead is just her coffee budget. Calculates the 'rental cost' of her seat in lattes.",
    coffeeRelationship:
      "The Rent: Buys a large drink and a sandwich to justify taking a table for 3 hours.",
    voice: "I can't take this Zoom call with that espresso machine screaming.",
    quirks:
      "Arrives 10 minutes before her meetings to 'scout' the noise level. Always has an extra battery pack.",
  },
  {
    id: 18,
    name: "Alex",
    role: "Routine-Driven Digital Nomad",
    personality:
      "Identity-driven 'Regular.' Likes feeling like he 'belongs' to a specific hub.",
    backstory:
      "Software dev who needs 'body doubling' to be productive. Policy changes feel like personal disruptions to him.",
    coffeeRelationship:
      "Loyal until the rules change. Most likely to feel 'personally insulted' by a price hike.",
    voice:
      "They capped the wifi to two hours? That's literally a dealbreaker for me.",
    quirks:
      "Actively 'Switches' if a policy (like wifi caps or outlet covers) changes his routine.",
  },
  {
    id: 19,
    name: "Ron",
    role: "Longtime Local",
    personality: "Nostalgic and grumpy-ish neighborhood guardian.",
    backstory:
      "Retired postal worker. He remembers the 'good old days' before the students moved in. He comes for the gossip.",
    coffeeRelationship:
      "Social excuse. The coffee quality is secondary to the feeling that this is 'his' neighborhood spot.",
    voice:
      "Four fifty for a black coffee? You're kidding me. In 1995, this was eighty cents.",
    quirks:
      "Price hikes sting deep; will complain to the baristas but stay because of 'emotional sunk cost.'",
  },
  {
    id: 20,
    name: "Linda",
    role: "Social Connector",
    personality:
      "The 'Neighborhood Heart': High-empathy, community-oriented, and deeply observant of the 'soul' of a space.",
    backstory:
      "A neighborhood resident for 15+ years; uses the cafe as her primary social 'living room.' Often organizes local book clubs or meetups.",
    coffeeRelationship:
      "Coffee = Connection: The drink is just the 'entry fee' to stay and chat. Prefers comfort over craft.",
    voice:
      "It just feels a little... cold in here today, don't you think? Not the temperature, just the vibe.",
    quirks:
      "Always sits where she can see the door to wave at neighbors. Won't complain—just stops showing up as often if unhappy.",
  },
];

// --- Sub-Components ---

const AgentCard: React.FC<{ agent: Agent; onClick: () => void }> = ({
  agent,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      className="w-64 cursor-pointer hover:shadow-xl hover:border-orange-400 transition-all active:scale-95 select-none bg-white/90 backdrop-blur-sm"
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold leading-none">
              {agent.name}
            </CardTitle>
            <p className="text-xs font-medium text-muted-foreground">
              {agent.role}
            </p>
          </div>
          <Badge variant="outline" className="text-[10px] shrink-0">
            ID: {agent.id}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-slate-600 line-clamp-2 italic border-l-2 border-slate-200 pl-2">
          "{agent.voice}"
        </p>
      </CardContent>
    </Card>
  );
};

export default function NodePanel() {
  // State
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.7);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Layout Constants
  const gridCols = 5;
  const spacingX = 320;
  const spacingY = 220;

  // Process data with positions
  const agents = agentsData.map((agent, index) => ({
    ...agent,
    x: (index % gridCols) * spacingX + 60,
    y: Math.floor(index / gridCols) * spacingY + 60,
  }));

  // --- Handlers ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".agent-node")) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    },
    [isDragging, dragStart],
  );

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    if (drawerOpen) return;
    const delta = e.deltaY * -0.001;
    setZoom((prev) => Math.min(Math.max(0.2, prev + delta), 2));
  };

  const onCardClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setDrawerOpen(true);
  };

  return (
    <div className="relative w-full h-screen bg-slate-50 overflow-hidden select-none font-sans">
      {/* Interactive Background Canvas */}
      <div
        className="absolute inset-0 transition-colors duration-300"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{
          backgroundImage: `radial-gradient(circle, #cbd5e1 1.5px, transparent 1.5px)`,
          backgroundSize: `${40 * zoom}px ${40 * zoom}px`,
          backgroundPosition: `${offset.x}px ${offset.y}px`,
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {/* Zoom/Pan Layer */}
        <div
          className="will-change-transform"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transformOrigin: "0 0",
          }}
        >
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="absolute agent-node"
              style={{ left: agent.x, top: agent.y }}
            >
              <AgentCard agent={agent} onClick={() => onCardClick(agent)} />
            </div>
          ))}
        </div>
      </div>

      {/* Floating UI Controls */}
      {/* <div className="absolute top-6 left-6 pointer-events-none">
        <h1 className="text-2xl font-bold text-slate-900 drop-shadow-sm">
          Agent Matrix
        </h1>
        <p className="text-slate-500 text-sm">Drag to pan • Scroll to zoom</p>
      </div> */}

      <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white/90 backdrop-blur-md border border-slate-200 p-2 rounded-2xl shadow-2xl ring-1 ring-black/5">
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl"
          onClick={() => setZoom((z) => Math.max(0.2, z - 0.1))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="px-2 min-w-[60px] text-center">
          <span className="text-xs font-bold tabular-nums">
            {Math.round(zoom * 100)}%
          </span>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl"
          onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-slate-200 mx-1" />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl"
          onClick={() => {
            setZoom(0.7);
            setOffset({ x: 0, y: 0 });
          }}
        >
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Detail Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="overflow-scroll">
          {selectedAgent && (
            <div className="flex flex-col h-full">
              <SheetHeader className="space-y-4 pb-6 border-b">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="rounded-md px-3">
                    {selectedAgent.role}
                  </Badge>
                </div>
                <div>
                  <SheetTitle className="text-4xl font-black tracking-tight">
                    {selectedAgent.name}
                  </SheetTitle>
                  <SheetDescription className="text-lg text-slate-600 mt-2 leading-relaxed">
                    {selectedAgent.personality}
                  </SheetDescription>
                </div>
              </SheetHeader>

              <ScrollArea className="flex-1 -mr-6 pr-6">
                <div className="py-8 space-y-10 px-5">
                  <DetailSection
                    title="Backstory"
                    content={selectedAgent.backstory}
                  />

                  <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <MousePointer2 size={48} />
                    </div>
                    <DetailSection
                      title="Internal Monologue"
                      content={`"${selectedAgent.voice}"`}
                      isItalic
                    />
                  </div>

                  <DetailSection
                    title="The Coffee Habit"
                    content={selectedAgent.coffeeRelationship}
                  />

                  <section>
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                      Behavioral Quirks
                    </h4>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                      <p className="text-slate-700 text-sm font-medium">
                        {selectedAgent.quirks}
                      </p>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

// --- Helper UI Component ---
const DetailSection: React.FC<{
  title: string;
  content: string;
  isItalic?: boolean;
}> = ({ title, content, isItalic }) => (
  <section className="space-y-2">
    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
      {title}
    </h4>
    <p
      className={`text-slate-700 leading-relaxed ${isItalic ? "text-xl font-medium italic italic text-slate-800" : "text-base"}`}
    >
      {content}
    </p>
  </section>
);
