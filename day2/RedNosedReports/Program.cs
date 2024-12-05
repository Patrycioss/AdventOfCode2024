var lines = File.ReadAllLines("input.txt");

var testLines = new List<string>()
{
    "7 6 4 2 1", // safe
    "1 2 7 8 9", // unsafe
    "9 7 6 2 1", // unsafe
    "1 3 2 4 5", // unsafe
    "8 6 4 4 1", // unsafe
    "1 3 6 7 9", // safe
};

int safeCount = Part2(lines);

Console.WriteLine($"Safe count: {safeCount}");
return;


int[] ParseNumbers(string line)
{
    return line.Split(" ", StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries).Select(int.Parse)
        .ToArray();
}

bool IsSafe(int[] sequence)
{
    int previous = -1;

    bool shouldBeIncreasing = sequence[0] < sequence[1];

    foreach (int current in sequence)
    {
        if (previous > 0)
        {
            int difference = previous - current;

            if (MathF.Abs(difference) is > 3 or 0)
            {
                return false;
            }

            if (difference > 0 && shouldBeIncreasing)
            {
                return false;
            }

            if (difference < 0 && !shouldBeIncreasing)
            {
                return false;
            }
        }

        previous = current;
    }

    return true;
}


int Part2(string[] strings)
{
    int count = 0;

    foreach (string str in strings)
    {
        int[] numbers = ParseNumbers(str);
        if (!IsSafe(numbers))
        {
            for (int i = 0; i < numbers.Length; i++)
            {
                List<int> newNumbers = [..numbers];
                newNumbers.RemoveAt(i);

                if (IsSafe(newNumbers.ToArray()))
                {
                    count++;
                    break;
                }
            }
        }
        else
        {
            count++;
        }
    }

    return count;
}


int Part1(string[] strings)
{
    int count = 0;

    foreach (string str in strings)
    {
        count += IsSafe(ParseNumbers(str)) ? 1 : 0;
    }

    return count;
}