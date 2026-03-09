import Main from "@/app/main/page";

export default function SharedPage({ params }: { params: Promise<{ id: string }> }) {
    return <Main params={params} />;
}