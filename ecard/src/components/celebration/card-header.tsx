"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

// 导出渐变颜色选项
export const gradientColors = [
  { name: "蓝色", gradient: "linear-gradient(to right, #0ba6f9, #33f3e4)" },
  { name: "紫色", gradient: "linear-gradient(to right, #6a11cb, #2575fc)" },
  { name: "绿色", gradient: "linear-gradient(to right, #11998e, #38ef7d)" },
  { name: "橙色", gradient: "linear-gradient(to right, #f12711, #f5af19)" },
  { name: "粉色", gradient: "linear-gradient(to right, #fc5c7d, #6a82fb)" },
];

// 社交媒体链接配置
const links = [
  {
    href: "",
    icon: faFacebookF,
  },
  {
    href: "",
    icon: faTwitter,
  },
  {
    href: "",
    icon: faInstagram,
  },
];

// 贺卡头部组件属性接口
interface CardHeaderProps {
  title?: string;
  description?: string;
  gradientColor?: string;
  onColorChange?: (color: string) => void;
  showColorPicker?: boolean;
}

// 贺卡头部组件
export function CardHeader({ 
  title = "Work Anniversary", 
  description,
  gradientColor = "linear-gradient(to right, #0ba6f9, #33f3e4)",
  onColorChange,
  showColorPicker = false
}: CardHeaderProps) {
  return (
    <section
      className="card-header bg-center bg-no-repeat bg-contain relative z-[1] bg-white dark:bg-[#0b1727] text-white overflow-hidden py-16 md:py-32 rounded-t-lg"
      style={{
        backgroundImage:
          "url(https://cdn.easyfrontend.com/pictures/background/abstract-background1.jpg)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 bottom-0 opacity-90 -z-[1]"
        style={{ background: gradientColor }}
      ></div>
      
      {/* 颜色选择器 */}
      {showColorPicker && onColorChange && (
        <div className="absolute top-4 right-4 flex gap-2">
          {gradientColors.map((color, index) => (
            <button
              key={index}
              className={`w-6 h-6 rounded-full border-2 ${gradientColor === color.gradient ? 'border-white' : 'border-transparent'}`}
              style={{ background: color.gradient }}
              onClick={() => onColorChange(color.gradient)}
              aria-label={`选择${color.name}主题`}
            />
          ))}
        </div>
      )}
      <div className="container px-4">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-8 md:col-start-3 text-center">
            <h2 className="text-[35px] md:text-6xl font-bold leading-snug">
              {title}
            </h2>
            <p className="text-xl leading-normal opacity-75 mt-6">
              {description || "Celebrate this special milestone with your colleagues and friends. Share your wishes and memories together."}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block h-14 w-full"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="text-white dark:text-[#0b1727]"
          ></path>
        </svg>
      </div>
    </section>
  );
}