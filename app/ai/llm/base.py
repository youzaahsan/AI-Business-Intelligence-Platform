"""
Base LLM Provider Interface
Abstracts model providers (Gemini, OpenAI, Anthropic, Local) with structured outputs and tool calling.
"""
from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional
from pydantic import BaseModel

class LLMResponse(BaseModel):
    content: str
    tool_calls: Optional[List[Dict[str, Any]]] = None
    structured_data: Optional[Dict[str, Any]] = None
    token_usage: Dict[str, int] = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
    raw_response: Optional[Any] = None

class BaseLLMProvider(ABC):
    @abstractmethod
    async def generate_text(
        self,
        prompt: str,
        system_instruction: Optional[str] = None,
        temperature: float = 0.2
    ) -> LLMResponse:
        pass

    @abstractmethod
    async def generate_structured(
        self,
        prompt: str,
        schema: type[BaseModel],
        system_instruction: Optional[str] = None
    ) -> LLMResponse:
        pass
