# Testing Guide - Interview Agent

## Sample Interview Questions to Test

Once you have your API key configured, try these questions to test the agent:

### General Questions
1. "Tell me about yourself"
2. "Why are you looking for a new role?"
3. "What are your biggest strengths?"
4. "What's your biggest weakness?"
5. "Where do you see yourself in 5 years?"

### Company-Specific Questions (Kore.ai)
1. "Why are you interested in Kore.ai?"
2. "How would your database expertise apply to our platform?"
3. "What excites you about conversational AI?"
4. "Have you worked with enterprise AI platforms before?"
5. "What do you think about our three-tier agentic architecture?"

### Company-Specific Questions (Descript)
1. "Why Descript?"
2. "What do you think about text-based video editing?"
3. "How would you approach scaling infrastructure for 6M+ creators?"
4. "What's your experience with real-time media processing?"
5. "Thoughts on Underlord AI and natural language interfaces?"

### Technical Questions
1. "Tell me about a challenging database problem you've solved"
2. "How do you approach system design?"
3. "Describe a time you had to make a difficult technical tradeoff"
4. "How do you handle database performance optimization?"
5. "What's your experience with Python at scale?"

### Brand/Strategy Questions (Uses your STAR answer!)
1. "How do you approach brand and awareness?"
2. "What's your positioning philosophy?"
3. "Tell me about a time you helped define a company's market position"
4. "How do you balance investor expectations with customer reality?"

### Behavioral Questions
1. "Tell me about a time you disagreed with a decision"
2. "How do you handle conflict on a team?"
3. "Describe your leadership style"
4. "Tell me about a project you're proud of"
5. "What would your colleagues say about working with you?"

## What to Look For

### ✅ Good Responses:
- Uses "I" statements (sounds like Mark speaking)
- Includes specific examples from past companies (Hortonworks, InfluxData, etc.)
- Blends standard answers with company-specific talking points naturally
- Direct, candid tone (not corporate-speak)
- Shows genuine enthusiasm about relevant tech

### ❌ Red Flags:
- Says "As an AI" or "Mark would say..." (should speak AS Mark)
- Generic answers that could apply to anyone
- Overly formal or robotic language
- Forces company talking points awkwardly
- Makes up experience Mark doesn't have

## Testing Without API Key

If you want to verify the structure works before getting an API key:

```bash
cd agent
python cli.py
```

Select a company, then use the `/context` and `/prompt` commands to inspect what would be sent to Claude.

```
/context   # Shows what files were loaded
/prompt    # Shows the full assembled system prompt
```

This lets you verify:
1. Files are loading correctly
2. Company context is being inserted
3. Standard answers are being included
4. System prompt looks good

## Iterating on Responses

If responses don't sound authentic:

1. **Add more specifics to `core/identity.md`**
   - More concrete examples from your career
   - Specific technologies you've worked with
   - Your actual values and preferences

2. **Expand standard answers**
   - Use more concrete examples
   - Include metrics and outcomes
   - Add more personality

3. **Tune the system prompt** (`agent/system_prompt.md`)
   - Adjust tone guidance
   - Add more do/don't examples
   - Strengthen the "sound like a real person" instructions

4. **Make company context more specific**
   - Add more detailed talking points
   - Include specific questions you want to ask them
   - Note specific things that excite you

## Advanced Testing

Once basic testing works, try edge cases:

1. **Hostile questions**: "Why should we hire you over someone with more experience?"
2. **Unclear questions**: "What do you think?" (should ask for clarification)
3. **Salary questions**: Should deflect politely
4. **Questions about missing experience**: Should be honest but frame positively
5. **Follow-up questions**: Test conversation memory

## Example Test Session

```
$ python agent/cli.py

Select company: 1 (Kore.ai)

INTERVIEWER: Why are you interested in Kore.ai?

MARK: [Should mention: 3-tier architecture, enterprise integrations,
      Forrester #1 ranking, alignment with Python/DB skills]

INTERVIEWER: How do you approach brand strategy?

MARK: [Should use the STAR answer from brand_strategy.md, maybe
      customized with Kore.ai-specific positioning insights]

INTERVIEWER: Tell me about your database experience

MARK: [Should pull from identity.md technical strengths, give
      specific examples, tie to Kore.ai's integration needs]
```

## Success Criteria

You'll know it's working when:
- ✅ Responses sound like you, not a bot
- ✅ Company-specific details are woven in naturally
- ✅ Standard answers are used but feel customized
- ✅ You'd be comfortable sending these responses to a real interviewer
- ✅ The agent asks clarifying questions when appropriate
- ✅ Tone matches your actual communication style

---

**Remember**: This is a tool to help you prepare and practice, not to replace actual interviews. Use it to:
- Refine your talking points
- Practice STAR formatting
- Ensure consistency across companies
- Test how well your experience maps to each company
