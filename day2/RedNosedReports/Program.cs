using System.Text;

var lines = File.ReadAllLines("input.txt");

int safeCount = 0;

var testLines = new List<string>()
{
    "7 6 4 2 1", // safe
    "1 2 7 8 9", // unsafe
    "9 7 6 2 1", // unsafe
    "1 3 2 4 5", // unsafe
    "8 6 4 4 1", // unsafe
    "1 3 6 7 9", // safe
};


for (int i = 0; i < lines.Length; i++)
{
    var numStrings = lines[i].Split(" ", StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

    List<int> numbers = new List<int>();
    int first = int.Parse(numStrings[0]);
    int second = int.Parse(numStrings[1]);
    
    numbers.Add(first);
    numbers.Add(second);

    bool safe = true;

    int currentDifference = second - first;
    if (currentDifference == 0 || MathF.Abs(currentDifference) > 3)
    {
        safe = false;
    }

    bool shouldBeIncreasing = currentDifference > 0;

    for (var index = 2; index < numStrings.Length; index++)
    {
        first = second;
        second = int.Parse(numStrings[index]);
        numbers.Add(second);

        currentDifference = second - first;

        if (currentDifference == 0)
        {
            safe = false;
            break;
        }

        if (currentDifference < 0 && shouldBeIncreasing)
        {
            safe = false;
            break;
        }

        if (currentDifference > 0 && !shouldBeIncreasing)
        {
            safe = false;
            break;
        }


        int absDifference = Math.Abs(currentDifference);

        if (absDifference > 3)
        {
            safe = false;
            break;
        }
    }

    if (safe)
    {
        safeCount++;
    }
    
    StringBuilder stringBuilder = new StringBuilder();
    stringBuilder.Append($"{i}:");
    foreach (var number in numbers)
    {
        stringBuilder.Append($"-{number}-");
    }
    stringBuilder.Append(safe? "Is Safe" : "Is Not Safe");
    Console.WriteLine(stringBuilder.ToString());
}

Console.WriteLine($"Safe count: {safeCount}");