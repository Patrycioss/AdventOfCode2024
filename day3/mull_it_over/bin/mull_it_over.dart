import 'dart:io';

RegExp mulExp = RegExp(r'mul+\(+\d+\,+\d+\)');
RegExp numExp = RegExp(r'\d+');
RegExp doExp = RegExp(r"do+\(\)");
RegExp doNotExp = RegExp(r"don\'t\(\)");

void part1(String input) {
  int total = 0;

  Iterable<RegExpMatch> mulMatches = mulExp.allMatches(input);
  for (final mulMatches in mulMatches) {
    Iterable<RegExpMatch> numMatches = numExp.allMatches(mulMatches[0]!);

    total += int.parse(numMatches.first[0].toString()) *
        int.parse(numMatches.elementAt(1)[0].toString());
  }
  print("Total Part1: $total");
}

void part2(String input) {
  var doMatches = doExp.allMatches(input);
  var doNotMatches = doNotExp.allMatches(input);

  var doAndDoNotMatches =
      doMatches.followedBy(doNotMatches).toList(growable: true);

  for (int i = doAndDoNotMatches.length - 1; i >= 0; i--) {
    for (int j = i - 1; j >= 0; j--) {
      var iVal = doAndDoNotMatches[i];
      var jVal = doAndDoNotMatches[j];

      if (iVal.start < jVal.start) {
        doAndDoNotMatches[j] = iVal;
        doAndDoNotMatches[i] = jVal;
      }
    }
  }

  int getValue(int start, int end) {
    int total = 0;

    for (var match in mulExp.allMatches(input.substring(start, end))) {
      var numMatches = numExp.allMatches(match[0]!);

      // print("${numMatches[0][0]} and ${numMatches[1][0]}");

      total += int.parse(numMatches.first[0].toString()) *
          int.parse(numMatches.elementAt(1)[0].toString());
    }

    return total;
  }

  bool reading = true;
  int start = 0;
  int total = 0;

  for (int matchIndex = 0;
      matchIndex < doAndDoNotMatches.length;
      matchIndex++) {
    var match = doAndDoNotMatches[matchIndex];
    if (match.pattern == doNotExp) {
      if (reading) {
        total += getValue(start, match.start);
        reading = false;
      }
    } else {
      if (!reading) {
        start = match.end;
        reading = true;

        if (matchIndex == doAndDoNotMatches.length - 1) {
          total += getValue(start, input.length);
        }
      }
    }
  }

  print("Total Part2: $total");
}

void main(List<String> arguments) async {
  print("Hello world!");

  late String input;

  await File('input/input.txt').readAsString().then((String contents) {
    input = contents;
  });

  part1(input);
  part2(input);
}
