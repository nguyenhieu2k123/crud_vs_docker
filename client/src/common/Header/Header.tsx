import {
	Menubar,
	MenubarMenu,
	MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link"

export default function Header() {
	return (
		<Menubar className="flex justify-center">
			<MenubarMenu>
				<MenubarTrigger>
					<Link href={"/"}>Home</Link>
				</MenubarTrigger>
				<MenubarTrigger>
					<Link href={"/orders"}>Orders</Link>
				</MenubarTrigger>
			</MenubarMenu>
		</Menubar>
	)
}
