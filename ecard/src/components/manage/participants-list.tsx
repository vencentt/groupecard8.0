"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { CopyIcon, TrashIcon } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Wish {
  id: string;
  name: string;
  message: string;
  email?: string;
  createdAt: string;
}

interface ParticipantsListProps {
  wishes: Wish[];
  onDeleteWish?: (wishId: string) => void;
}

export function ParticipantsList({ wishes, onDeleteWish }: ParticipantsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name">("date");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [wishToDelete, setWishToDelete] = useState<string | null>(null);
  
  // 过滤和排序祝福
  const filteredWishes = wishes
    .filter(wish => 
      wish.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      wish.message.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return a.name.localeCompare(b.name);
      }
    });

  // 处理删除祝福
  const handleDeleteClick = (wishId: string) => {
    setWishToDelete(wishId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (wishToDelete && onDeleteWish) {
      onDeleteWish(wishToDelete);
      toast({
        title: "已删除",
        description: "祝福内容已成功删除",
      });
    }
    setDeleteDialogOpen(false);
    setWishToDelete(null);
  };

  // 复制祝福内容
  const copyWishContent = (wish: Wish) => {
    const content = `From ${wish.name}:\n${wish.message}`;
    navigator.clipboard.writeText(content).then(
      () => {
        toast({
          title: "已复制",
          description: "祝福内容已复制到剪贴板",
        });
      },
      (err) => {
        console.error("无法复制内容: ", err);
        toast({
          title: "复制失败",
          description: "无法复制内容，请手动复制",
          variant: "destructive",
        });
      }
    );
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search by name or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={sortBy === "date" ? "default" : "outline"}
            onClick={() => setSortBy("date")}
            size="sm"
          >
            Sort by Date
          </Button>
          <Button 
            variant={sortBy === "name" ? "default" : "outline"}
            onClick={() => setSortBy("name")}
            size="sm"
          >
            Sort by Name
          </Button>
        </div>
      </div>

      {filteredWishes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No wishes found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredWishes.map((wish) => (
            <div key={wish.id} className="border rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{wish.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(wish.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => copyWishContent(wish)}
                  >
                    <CopyIcon className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  {onDeleteWish && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteClick(wish.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <TrashIcon className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>
              <p className="mt-2">{wish.message}</p>
              {wish.email && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Email: {wish.email}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
      {/* 删除确认对话框 */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除这条祝福信息吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
