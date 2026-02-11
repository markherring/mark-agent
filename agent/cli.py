#!/usr/bin/env python3
"""
Mark's Interview Agent - CLI Interface

Terminal-based chatbot for testing interview responses.
"""

import sys
from engine import InterviewAgent


def print_header():
    """Print welcome header"""
    print("\n" + "="*60)
    print("  MARK'S INTERVIEW AGENT - CLI")
    print("="*60)
    print("\nThis agent represents Mark Herring in interview contexts.")
    print("Ask interview questions and get authentic responses.\n")


def select_company(agent: InterviewAgent) -> str:
    """Let user select which company context to load"""
    companies = agent.get_available_companies()

    if not companies:
        print("ERROR: No company context files found in companies/ directory")
        sys.exit(1)

    print("Available companies:")
    for i, company in enumerate(companies, 1):
        display_name = company.replace('_', '.').title()
        print(f"  {i}. {display_name}")

    while True:
        try:
            choice = input("\nSelect company (enter number): ").strip()
            idx = int(choice) - 1
            if 0 <= idx < len(companies):
                return companies[idx]
            else:
                print(f"Please enter a number between 1 and {len(companies)}")
        except ValueError:
            print("Please enter a valid number")
        except KeyboardInterrupt:
            print("\n\nExiting...")
            sys.exit(0)


def print_interviewer_prompt():
    """Print the interviewer prompt"""
    print("\n" + "-"*60)
    print("INTERVIEWER: ", end='', flush=True)


def print_mark_response(response: str):
    """Print Mark's response"""
    print("\n" + "-"*60)
    print(f"MARK: {response}")
    print("-"*60)


def run_cli():
    """Main CLI loop"""
    print_header()

    # Initialize agent
    agent = InterviewAgent()

    # Check if API key is configured
    if not agent.client:
        print("\n⚠️  WARNING: No API key detected!")
        print("Set ANTHROPIC_API_KEY environment variable to enable Claude API.")
        print("\nTo test the agent without API calls, you can still:")
        print("1. Inspect the loaded context")
        print("2. See the assembled system prompt\n")

        choice = input("Continue anyway to inspect context? (y/n): ").strip().lower()
        if choice != 'y':
            print("Exiting. Set ANTHROPIC_API_KEY to use the full agent.")
            sys.exit(0)

    # Select company
    company = select_company(agent)
    display_name = company.replace('_', '.').title()

    print(f"\n✓ Loading context for {display_name}...")
    agent.start_conversation(company)

    print(f"✓ Agent ready! You are now interviewing Mark for {display_name}")
    print("\nCommands:")
    print("  /help     - Show this help")
    print("  /context  - Show loaded context summary")
    print("  /prompt   - Show full system prompt")
    print("  /reload   - Reload all files (after editing)")
    print("  /quit     - Exit\n")

    # Main conversation loop
    while True:
        try:
            print_interviewer_prompt()
            user_input = input().strip()

            if not user_input:
                continue

            # Handle commands
            if user_input.startswith('/'):
                command = user_input.lower()

                if command == '/quit' or command == '/exit':
                    print("\nThanks for testing! Goodbye.\n")
                    break

                elif command == '/help':
                    print("\nCommands:")
                    print("  /help     - Show this help")
                    print("  /context  - Show loaded context summary")
                    print("  /prompt   - Show full system prompt")
                    print("  /quit     - Exit")
                    continue

                elif command == '/context':
                    print("\nLoaded Context:")
                    print(f"  Company: {display_name}")
                    print(f"  Identity: {len(agent.context['identity'])} chars")
                    print(f"  Company context: {len(agent.context['company_context'])} chars")
                    print(f"  Standard answers: {len(agent.context['standard_answers'])} chars")
                    print(f"  Conversation history: {len(agent.conversation_history)} messages")
                    continue

                elif command == '/prompt':
                    print("\n" + "="*60)
                    print("FULL SYSTEM PROMPT:")
                    print("="*60)
                    print(agent.system_prompt)
                    print("="*60)
                    continue

                elif command == '/reload':
                    print(f"\n🔄 Reloading all files for {display_name}...")
                    agent.start_conversation(company)
                    print("✓ Files reloaded! Conversation history cleared.")
                    print("  You can now test your updated content.\n")
                    continue

                else:
                    print(f"\nUnknown command: {user_input}")
                    print("Type /help for available commands")
                    continue

            # Send to agent
            if not agent.client:
                print("\n[Cannot send message - no API key configured]")
                print("The system prompt has been assembled and would be sent to Claude.")
                continue

            response = agent.send_message(user_input)
            print_mark_response(response)

        except KeyboardInterrupt:
            print("\n\nExiting...")
            break
        except Exception as e:
            print(f"\nERROR: {str(e)}")
            continue

    print()


if __name__ == "__main__":
    run_cli()
