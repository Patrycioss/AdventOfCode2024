#include <stdio.h>
#include <stdlib.h>
#include <string.h>

long get_file_contents(const char* file_name, char** buffer) {
	long file_length = 0;
	FILE* f = fopen(file_name, "rb");

	if (f) {
		fseek(f, 0, SEEK_END);
		file_length = ftell(f);
		fseek(f, 0, SEEK_SET);
		*buffer = malloc(file_length);
		if (*buffer) {
			fread(*buffer, 1, file_length, f);
		}
		fclose(f);
	} else {
		fprintf(stderr, "Failed to open file with path: %s\n", file_name);
	}

	return file_length;
}

int main(void) {
	char* buffer = nullptr;
	get_file_contents("input/data.txt", &buffer);

	if (!buffer) {
		printf("Error reading file\n");
	}

	constexpr size_t column_size = 1000;

	int left_column[column_size];
	int right_column[column_size];
	size_t column_index = 0;

	constexpr char delim[2] = " \n";

	char* end_ptr = nullptr;

	char* token = strtok(buffer, delim);
	int number = strtol(token, &end_ptr, 10);
	left_column[0] = number;

	bool left = false;

	while (token != NULL) {
		token = strtok(nullptr, delim);

		number = strtol(token, &end_ptr, 10);
		// printf("Token:%s, Number:%i\n", token, number);

		if (column_index == column_size) {
			printf("Breaking on index: %llu\n", column_index);
			break;
		}

		if (left) {
			left_column[column_index] = number;
			left = false;
		} else {
			right_column[column_index] = number;
			column_index = column_index + 1;
			left = true;
		}

		// printf("Current index: %i\n",index);
	}

	for (int i = column_size - 1; i >= 0; i--) {
		for (int j = i - 1; j >= 0; j--) {
			const int left_i_val = left_column[i];
			const int left_j_val = left_column[j];

			if (left_i_val < left_j_val) {
				left_column[j] = left_i_val;
				left_column[i] = left_j_val;
			}

			const int right_i_val = right_column[i];
			const int right_j_val = right_column[j];

			if (right_i_val < right_j_val) {
				right_column[j] = right_i_val;
				right_column[i] = right_j_val;
			}
		}
	}

	int total_distance = 0;
	for (int i = 0; i < column_size; i++) {
		total_distance += abs(left_column[i] - right_column[i]);
	}

	int similarity_score = 0;

	for (int i = 0; i < column_size; i++) {
		int count = 0;
		const int left_val = left_column[i];
		for (int j = 0; j < column_size; j++) {
			if (left_val == right_column[j]) {
				count++;
			}
		}
		similarity_score += (count * left_val);
	}


	printf("Total Distance: %i\n", total_distance);
	printf("Similarity Score: %i\n", similarity_score);

	// for (int i = 0; i < column_size; i++) {
	// 	printf("Left: %i, Right: %i\n", left_column[i], right_column[i]);
	// }

	free(buffer);
	free(token);
	// free(fileString);
	return 0;
}
