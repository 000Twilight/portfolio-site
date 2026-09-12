"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import useDebounce from "@/hooks/use-debounce";
import { gsap } from "gsap";

export interface DropdownAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  short?: string;
  end?: string;
}

interface AnimatedDropdownProps {
  actions: DropdownAction[];
  selectedId?: string;
  onSelect: (action: DropdownAction) => void;
  triggerIcon?: React.ReactNode;
  placeholder?: string;
  className?: string;
}

export function AnimatedDropdown({
  actions,
  selectedId,
  onSelect,
  triggerIcon,
  placeholder = "Search...",
  className = "",
}: AnimatedDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, 200);

  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filteredActions = useMemo(() => {
    if (!debouncedQuery) return actions;
    const normalizedQuery = debouncedQuery.toLowerCase().trim();
    return actions.filter((action) => {
      const searchableText = `${action.label} ${action.description || ""}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [debouncedQuery, actions]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setActiveIndex(-1);
    }
  }, [isOpen]);

  // Animate popover and items
  useEffect(() => {
    if (!popoverRef.current) return;
    const popover = popoverRef.current;
    
    if (isOpen) {
      gsap.fromTo(
        popover,
        { opacity: 0, y: -10, scale: 0.98, transformOrigin: "top center" },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" }
      );
      
      const items = listRef.current?.querySelectorAll("li");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.2, stagger: 0.03, ease: "power2.out", delay: 0.05 }
        );
      }
    }
  }, [isOpen, filteredActions.length]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          setIsOpen(true);
        }
        return;
      }

      if (!filteredActions.length) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev < filteredActions.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredActions.length - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0 && filteredActions[activeIndex]) {
            onSelect(filteredActions[activeIndex]);
            setIsOpen(false);
          } else if (filteredActions.length > 0 && query) {
            onSelect(filteredActions[0]);
            setIsOpen(false);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          break;
      }
    },
    [isOpen, filteredActions, activeIndex, onSelect, query]
  );

  const selectedAction = actions.find((a) => a.id === selectedId);

  return (
    <div className={`relative ${className}`} ref={containerRef} onKeyDown={handleKeyDown}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full gap-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-2.5 py-1.5 text-xs text-[#374151] hover:bg-white hover:border-[#D1D5DB] transition-all focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2 truncate">
          {triggerIcon && <span className="text-[#6B7280]">{triggerIcon}</span>}
          <span className="font-medium truncate">
            {selectedAction ? selectedAction.label : "Select option..."}
          </span>
        </div>
        <ChevronDown size={14} className={`text-[#9CA3AF] shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Popover */}
      {isOpen && (
        <div 
          ref={popoverRef}
          className="absolute z-50 top-full left-0 mt-2 w-full min-w-[280px] bg-white border border-[#E5E7EB] rounded-2xl shadow-xl overflow-hidden right-auto sm:right-0 sm:left-auto flex flex-col"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Search Input */}
          <div className="relative border-b border-[#E5E7EB] bg-[#F9FAFB]/50">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              placeholder={placeholder}
              className="w-full bg-transparent pl-9 pr-4 py-3 text-xs text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-hidden"
            />
          </div>

          {/* Results List */}
          <ul 
            ref={listRef}
            role="listbox"
            className="max-h-[260px] overflow-y-auto p-1.5"
          >
            {filteredActions.length === 0 ? (
              <li className="px-3 py-4 text-center text-xs text-[#6B7280]">
                No matching results found.
              </li>
            ) : (
              filteredActions.map((action, index) => {
                const isSelected = selectedId === action.id;
                const isActive = activeIndex === index;
                
                return (
                  <li
                    key={action.id}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onSelect(action);
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-colors ${
                      isActive ? "bg-[#F3F4F6]" : "hover:bg-[#F9FAFB]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {action.icon ? (
                        <span className="text-[#6B7280] flex shrink-0">
                          {action.icon}
                        </span>
                      ) : (
                        <div className="w-4" />
                      )}
                      <div className="flex flex-col truncate">
                        <span className={`text-xs font-medium truncate ${isSelected ? "text-indigo-600" : "text-[#1F2937]"}`}>
                          {action.label}
                        </span>
                        {action.description && (
                          <span className="text-[10px] text-[#6B7280] truncate">
                            {action.description}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      {action.short && (
                        <span className="text-[10px] font-mono font-medium text-[#9CA3AF] bg-[#F9FAFB] border border-[#E5E7EB] px-1.5 py-0.5 rounded-md">
                          {action.short}
                        </span>
                      )}
                      {isSelected && (
                        <Check size={14} className="text-indigo-600" />
                      )}
                    </div>
                  </li>
                );
              })
            )}
          </ul>
          
          <div className="bg-[#F9FAFB] border-t border-[#E5E7EB] px-3 py-2 flex items-center justify-between text-[10px] text-[#9CA3AF]">
            <span>Use ↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
        </div>
      )}
    </div>
  );
}
