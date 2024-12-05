// Regex for looking the mul up
// /([m])\w+\(+\d+\,+\d+\)/g
import 'dart:io';

void main(List<String> arguments) async {
  print("Hello world!");

  late String input;

  await File('input/input.txt').readAsString().then((String contents) {
    input = contents;
  });

  RegExp mulExp = RegExp(r'([m])\w+\(+\d+\,+\d+\)');
  RegExp numExp = RegExp(r'\d+');

  int total = 0;

  Iterable<RegExpMatch> mulMatches = mulExp.allMatches(input);
  for (final mulMatches in mulMatches) {
    Iterable<RegExpMatch> numMatches = numExp.allMatches(mulMatches[0]!);

    total += int.parse(numMatches.first[0].toString()) *
        int.parse(numMatches.elementAt(1)[0].toString());
  }
  print(total);
}
